import Koa from "koa";
import logger from "koa-logger";
import path from "path";
import serve from "koa-static";
import mount from "koa-mount";
const router = require("@koa/router")();
import koaBody from "koa-body";
import render from "./lib/render";
import { createServer } from "http";
import { Server } from "socket.io";
import Room from "./controller/room";
import Message from "./controller/message";

const app = new Koa();
app.use(mount("/", serve(path.join(__dirname, "/views/"))));
const httpServer = createServer(app.callback());

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket.id);

  console.log("a user connected");
});

// "database"
// Middlewares
app.use(logger());

app.use(render);

app.use(koaBody());

// app.use(router.allowedMethods());

// Routes
router
  .get("/", list)
  .get("/joinRoom/:id/:roomName", joinRoom)
  .post("/sendMsgtoRoom", sendMsgtoRoom)
  .get("/listRooms", listRoom);
app.use(router.routes());

async function list(ctx: Koa.Context) {
  await ctx.render("index", {});
}

async function joinRoom(ctx: Koa.Context, next: Function) {
  // await next();

  const uuid = ctx.params.id;
  const roomName = ctx.params.roomName;
  // const roomNameWithPrefix = `${RoomPrefix}${roomName}`;
  io.in(uuid).socketsJoin(roomName);
  io.emit("connected_to_room");
  ctx.body = {
    id: ctx.params.id,
  };
}




async function sendMsgtoRoom(ctx: Koa.Context, next: Function) {
   const message = new Message(io);
  const BodyData = <{
    message: string;
    senderUserId: string;
    roomId: string
  }>ctx.request.body;

  const roomId = BodyData.roomId;
  const messageToSend = BodyData.message;
  const sendUserId = BodyData.senderUserId;

  message.sendMessage(sendUserId, messageToSend, roomId);

  ctx.body = {
    success: true
  };
  // io.to(roomId).emit("message", {
  //   message: "ctx.request.body.message",
  // });
  // ctx.body = {
  //   roomId: roomId,
  // };
}

async function listRoom(ctx: Koa.Context, next: Function) {
  const room = new Room(io);
  const roomsList = room.listRooms();

  ctx.body = {
    roomsList,
  };
}

const port = process.env.APP_PORT || 3000;
httpServer.listen(port);
