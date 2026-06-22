// //  for later import { useEffect, useState } from "react";
// import { Text, View } from "react-native";

// export default function Index() {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     async function load() {
//       try {
//         console.log("Fetching todos from ngrok...");
//         const res = await fetch(
//           "https://overcrowd-theft-extended.ngrok-free.dev/api/todos",
//         );
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         console.log("Fetched todos:", data);
//         setTodos(data);
//       } catch (error) {
//         console.error("Failed to fetch todos:", error);
//       }
//     }

//     load();
//   }, []);

//   return (
//     <View style={{ padding: 20, marginTop: 60 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold" }}>Linio Todos</Text>
//       {todos.length === 0 ? (
//         <Text>Loading todos... Check the console for errors.</Text>
//       ) : (
//         todos.map((todo: any) => <Text key={todo.id}>{todo.title}</Text>)
//       )}
//     </View>
//   );
// }
