export default function({ $axios, app }) {
    $axios.onRequest(config => {
        $axios.setHeader('Lang', app.i18n.locale)
    })
}