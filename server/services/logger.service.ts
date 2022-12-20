import fs from 'fs';
import chalk from 'chalk';
import asyncLocalStorage from './als.service';

const chalkSwitch = (level: string) => {
    if (process.env.NODE_NEV === 'production') return level;
    switch (level) {
        case 'DEBUG': return chalk.cyan(level)
        case 'INFO': return chalk.yellowBright(level)
        case 'WARN': return chalk.yellow(level)
        case 'ERROR': return chalk.red(level)
        default: return level;
    }
};

const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

//define the time format
function getTime() {
    const now = new Date();
    return now.toLocaleString();
}

function isError(e: any) {
    return e && e.stack && e.message;
}

function doLog(level: string, ...args: any) {
    const strs = args.map((arg: any) =>
        typeof arg === 'string' || isError(arg) ? arg : JSON.stringify(arg)
    );

    const line = strs.join(' | ');
    const store = asyncLocalStorage.getStore();
    const sessionId = store?.sessionId;
    const sid = sessionId ? `(sid: ${sessionId})` : '';
    const logLine = `[ ${getTime()} ] - ${level} - ${line} ${sid} \n`;
    const cmdLine = `[${getTime()}] - ${chalkSwitch(level)} - ${line} ${sid} \n`;   
    fs.appendFileSync(`${logsDir}/server.log`, logLine);
    console.log(cmdLine);
}

const loggerService = {
    debug(...args: any[]) {
        if (process.env.NODE_NEV === 'production') return
        doLog('DEBUG', ...args);
    },
    info(...args: any[]) {
        doLog('INFO', ...args);
    },
    warn(...args: any[]) {
        doLog('WARN', ...args);
    },
    error(...args: any[]) {
        doLog('ERROR', ...args);
    },
}

export default loggerService;
