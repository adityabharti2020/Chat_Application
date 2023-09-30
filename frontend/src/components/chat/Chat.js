// import React, { useEffect } from "react";
// import socketIo from "socket.io-client";

// const ENDPOINT = "http://localhost:3000";
// export const Chat = () => {
//   const socket = socketIo(ENDPOINT, { transports: ["websocket"] });
//   useEffect(() => {
//     socket.on(
//       "connnect",
//       () => {
//         alert("connnected");
//         socket.emit("joined", { user });
//         return () => {};
//       },
//       [socket]
//     );
//   });

//   return <div>Chat</div>;
// };
