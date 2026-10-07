// Runs before first paint (loaded synchronously in <head>) so the page never
// flashes the wrong theme. A file rather than an inline script, so it works
// under a Content-Security-Policy that only allows same-origin scripts.
;(function () {
    var mode = null
    try {
        mode = localStorage.getItem('wae-theme')
    } catch {
        mode = null
    }
    var dark =
        mode === 'dark' ||
        (mode !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
})()
