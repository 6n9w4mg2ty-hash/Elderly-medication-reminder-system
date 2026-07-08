/**
 * ===== 長者客製化定時服藥提醒器 =====
 */
/**
 * 使用 Micro:bit V2 內建喇叭與 LED 螢幕
 */
/**
 * ---------- 全域變數宣告 ----------
 */
input.onButtonPressed(Button.A, function () {
    // ---------- 3. 按鈕 A：解除關閉提醒 ----------
    reminding = false
    // 停止所有正在播放的音樂
    music.stopAllSounds()
    // 顯示打勾圖案，持續 2 秒後清除
    basic.clearScreen()
    basic.showIcon(IconNames.Yes)
    basic.pause(2000)
    basic.clearScreen()
})
// 旋律模式 1/2/3
// ---------- 1. 初始設定 ----------
input.onGesture(Gesture.Shake, function () {
    // ---------- 5. 搖晃切換旋律 ----------
    if (melody_mode == 1) {
        melody_mode = 2
    } else if (melody_mode == 2) {
        melody_mode = 3
    } else {
        melody_mode = 1
    }
    // 顯示目前歌曲編號
    basic.showNumber(melody_mode)
    // 試聽播放 1 秒鐘
    if (melody_mode == 1) {
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.OnceInBackground)
    } else if (melody_mode == 2) {
        music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.OnceInBackground)
    } else {
        music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.OnceInBackground)
    }
    basic.pause(1000)
    music.stopAllSounds()
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    // ---------- 4. 按鈕 B：切換音量大中小 ----------
    if (volume_mode == 1) {
        volume_mode = 2
    } else if (volume_mode == 2) {
        volume_mode = 3
    } else {
        volume_mode = 1
    }
    // 依據模式設定音量並顯示數字
    if (volume_mode == 1) {
        music.setVolume(150)
        basic.showNumber(1)
    } else if (volume_mode == 2) {
        music.setVolume(200)
        basic.showNumber(2)
    } else {
        music.setVolume(250)
        basic.showNumber(3)
    }
    // 發出短暫嗶聲確認
    music.playTone(988, music.beat(BeatFraction.Eighth))
    basic.pause(300)
    basic.clearScreen()
})
let reminding = false
let melody_mode = 0
let volume_mode = 0
// 是否正在提醒中 (布林值)
// 音量模式 1=小 2=中 3=大
volume_mode = 2
// 旋律模式 1/2/3
melody_mode = 1
// ---------- 初始化設定 ----------
music.setVolume(255)
reminding = false
volume_mode = 2
melody_mode = 1
// ---------- 2. 定時提醒主迴圈 ----------
basic.forever(function () {
    // 每隔 5 秒觸發一次（測試用）
    basic.pause(5000)
    reminding = true
    while (reminding) {
        // 根據 melody_mode 播放對應旋律
        if (melody_mode == 1) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.OnceInBackground)
        } else if (melody_mode == 2) {
            music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.OnceInBackground)
        } else {
            music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.OnceInBackground)
        }
        // LED 螢幕閃爍顯示驚嘆號「!」
        basic.showString("!")
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
    }
})
