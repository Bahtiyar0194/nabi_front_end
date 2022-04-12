export default function({ $axios, app }) {
    $axios.setBaseURL('http://myapp.loc')
    $axios.onRequest(config => {
        $axios.setHeader('Lang', app.i18n.locale)
    })
}