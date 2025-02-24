import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Empty } from "phosphor-react-native";
import { StyleSheet, Text, View, useColorScheme, TouchableOpacity, Dimensions } from "react-native";

export interface EmptyListButton {
  icon: React.ReactElement;
  onPress: () => void;
  text: string;
}

interface EmptyListProps {
  title: string;
  text: string;
  buttons?: EmptyListButton[];
  icon?: React.ReactElement;
  marginTop?: number;
}

export function EmptyList({ title, text, buttons, icon, marginTop = 0 }: EmptyListProps) {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  if (!icon) {
    icon = <Empty size={64} color={colors.text} />;
  }

  const styles = StyleSheet.create(
    {
      emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: marginTop
      },
      emptyText: {
        fontSize: 16,
        lineHeight: 22,
        color: colors.text,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: Fonts.sansSerif,
      },
      emptyTitle: {
        fontSize: 22,
        color: colors.text,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.sansSerif,
      },
      buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
      },
      emptyButton: {
        flex: 1,
        maxWidth: Dimensions.get('window').width / 2 - 20,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
      },
      emptyButtonText: {
        color: colors.text,
        fontSize: 16,
        fontFamily: Fonts.sansSerif,
      },
    }
  )
  return <View style={styles.emptyContainer}>
    {icon}
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyText}>{text}</Text>
    <View style={styles.buttonContainer}>
      {buttons && buttons.map(button => <TouchableOpacity
        key={button.text}
        style={styles.emptyButton}
        onPress={button.onPress}
      >
        {button.icon}
        <Text style={styles.emptyButtonText}>{button.text}</Text>
      </TouchableOpacity>)}
    </View>
  </View>;
}

