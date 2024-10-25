export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("inline-svg", {
        mounted(element) {
            if (element.children.length === 0) {
                return
            }

            const svg = element.children[0]

            if (svg.tagName.toLowerCase() !== "svg") {
                return
            }

            for (let i = 0; i < svg.attributes.length; i++) {
                const attr = svg.attributes.item(i)
                element.setAttribute(attr.nodeName, attr.nodeValue)
            }

            svg.replaceWith(...svg.children)
        },
        getSSRProps() {
            return {}
        }
    })
})
