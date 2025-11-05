import type React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";

function App(): React.JSX.Element {
	return (
		<SafeAreaView>
			<StatusBar barStyle="dark-content" />
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<View style={{ padding: 20 }}>
					<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
						HanaCare Super App
					</Text>
					<Text style={{ fontSize: 16, color: "#666" }}>
						Welcome to HanaCare Mobile Platform
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default App;
