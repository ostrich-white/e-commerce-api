import app from "./app";

const {PORT: port = 3000 }= process.env;

const setupServer = () : void => {
  const server = app.listen(port, () => console.log(`Server listening on port ${port}.`));
  
  const unexpectedErrorHandler = () => {
    if (server) {
      server.close(()=> process.exit(1))
    } else {
      process.exit(1)
    }
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
}

export default setupServer;