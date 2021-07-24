// import pm2, {ProcessDescription} from 'pm2';
// import {findServerInfo, removeServerInfo} from './config';
// import {runAction} from './action';
//
// let processPrefix = 'paperweight::';
//
// let connectPromise: Promise<any> | null = null;
//
// export async function connect() {
//     if(!connectPromise) {
//         connectPromise = new Promise((resolve, reject) => {
//             pm2.connect(true, (err) => {
//                 if(err) {
//                     return reject(err);
//                 }
//                 // @ts-ignore
//                 pm2.Client.launchBus((err, bus, socket) => {
//                     if(err) {
//                         return console.error(err.stack || err);
//                     }
//
//                     bus.on('log:*', (type: string, packet: any) => {
//                         if(!packet.process.name.startsWith(processPrefix)) {
//                             return;
//                         }
//                         let id = packet.process.name.substring(processPrefix.length);
//
//                         runAction('server_output', {
//                             id,
//                             source: type,
//                             text: packet.data || '',
//                         }).catch(err => console.error(err));
//                     });
//                     return resolve(bus);
//                 });
//             });
//         });
//     }
//     await connectPromise;
// }
//
// export function disconnect() {
//     pm2.disconnect();
//     if(connectPromise) {
//         connectPromise.then(bus => bus.close());
//     }
//     connectPromise = null;
// }
//
// export async function listServers(): Promise<ProcessDescription[]> {
//     await connect();
//
//     let list = await new Promise((resolve, reject) => {
//         pm2.list((err, result) => err ? reject(err) : resolve(result));
//     }) as ProcessDescription[];
//
//     return list.filter(opt => opt.name?.startsWith(processPrefix));
// }
//
// export async function startServer(id: string) {
//     await connect();
//
//     let info = await findServerInfo(id);
//
//     await new Promise((resolve, reject) => {
//         // @ts-ignore
//         pm2.start({
//             name: processPrefix + id,
//             script: info.file,
//             args: info.args,
//             cwd: info.cwd,
//             interpreter: info.interpreter || 'none',
//             autorestart: false,
//         }, (err) => err ? reject(err) : resolve(null));
//     });
// }
//
// export async function restartServer(id: string) {
//     await connect();
//
//     await new Promise((resolve, reject) => {
//         pm2.restart(processPrefix + id,
//             (err) => err ? reject(err) : resolve(null));
//     });
// }
//
// export async function stopServer(id: string) {
//     await connect();
//
//     await new Promise((resolve, reject) => {
//         pm2.stop(processPrefix + id,
//             (err) => err ? reject(err) : resolve(null));
//     });
// }
//
// export async function removeServer(id: string): Promise<boolean> {
//     await connect();
//
//     let changed = false;
//     if((await listServers()).some(s => processPrefix + id === s.name)) {
//         await new Promise((resolve, reject) => {
//             pm2.delete(processPrefix + id,
//                 (err) => err ? reject(err) : resolve(null));
//         });
//         changed = true;
//     }
//     if(await removeServerInfo(id)) {
//         changed = true;
//     }
//     return changed;
// }