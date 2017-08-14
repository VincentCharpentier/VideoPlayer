
export function toTimeLabel(timeInSeconds) {
    timeInSeconds = Math.round(timeInSeconds);
    let s = timeInSeconds % 60;
    let remain = (timeInSeconds - s) / 60;
    let m = remain % 60;
    let h = (remain - m) / 60;
    s = s < 10 ? '0' + s : s;
    if (timeInSeconds >= 3600) {
        m = m < 10 ? '0' + m : m;
        return `${h}:${m}:${s}`;
    }
    return `${m}:${s}`;
}
