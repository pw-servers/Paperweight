'use strict';

import {promisify} from 'util';
import fs from 'fs';
import {ServerConfig} from 'paperweight-common';

export interface Config {
    servers: ServerConfig[],
}

let configPath = './paperweight.json';
let specialConfig: Config | null = null;

function createDefaultConfig() {
    return {
        servers: [],
    };
}

export function setConfigSource(source: Config | string | null) {
    if(typeof source === 'string') {
        configPath = source;
    }
    else {
        specialConfig = source || createDefaultConfig();
    }
}

export async function loadConfig(): Promise<Config> {
    if(specialConfig) {
        return specialConfig;
    }
    if(!fs.existsSync(configPath)) {
        return createDefaultConfig();
    }
    return JSON.parse((await promisify(fs.readFile)(configPath)).toString());
}


export async function saveConfig(config: Config): Promise<boolean> {
    if(specialConfig) {
        return false;
    }
    await promisify(fs.writeFile)(configPath, JSON.stringify(config));
    return true;
}

export async function findServerInfo(id: string): Promise<ServerConfig> {
    let config = await loadConfig();
    let info = config.servers.find(s => s.id === id);
    if(!info) {
        throw new Error('Unknown server ID: ' + id);
    }
    return info;
}

export async function addServerInfo(info: ServerConfig) {
    let config = await loadConfig();
    if(config.servers.some(s => s.id === info.id)) {
        throw new Error('Duplicate server ID: ' + info.id);
    }
    config.servers.push(info);
    await saveConfig(config);
}

export async function removeServerInfo(id: string): Promise<boolean> {
    let config = await loadConfig();
    let len = config.servers.length;
    config.servers = config.servers.filter(s => s.id !== id);
    await saveConfig(config);
    return len !== config.servers.length;
}
