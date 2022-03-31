export function classnames(...args: string[]):string {
    return Array.from(args).filter(x => x !== null).join(' ');
}

export function converToLocalTime(inputDate:number): string {
    return new Date(inputDate).toLocaleString();
}