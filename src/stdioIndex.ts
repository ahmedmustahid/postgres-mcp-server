#!/usr/bin/env node
import { startStdioServer } from "./stdio/stdioServer.js";

startStdioServer().catch(console.error);
