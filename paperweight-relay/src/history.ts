const MAX_COUNT = 1000;
const DEFAULT_COUNT = 100;

let historyMap = new Map();

export interface HistoryRecord {
    timestamp: number,
    type: string,
    args?: object,
}

export async function addHistory(record: HistoryRecord) {
    if(record.args && 'id' in record.args) {
        // @ts-ignore
        let id = record.args.id;
        let list = historyMap.get(id);
        if(!list) {
            list = [];
            historyMap.set(id, list);
        }
        if(list.length >= MAX_COUNT) {
            list.shift();
        }
        list.push(record);
    }
}

export async function clearServerHistory(id: string): Promise<boolean> {
    return historyMap.delete(id);
}

export async function findServerHistory(id: string, count: number = DEFAULT_COUNT): Promise<HistoryRecord[]> {
    let list = historyMap.get(id) || [];
    return list.slice(-count);
}