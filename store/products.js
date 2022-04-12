export const state = () => ({
    products: {},
    products_in_basket: {}
})
export const mutations = {
    updateProducts(state, products) {
        state.products = products
    },
    updateProductsInBasket(state, products_in_basket) {
        state.products_in_basket = products_in_basket
    }
}

export const actions = {
    async fetchProducts({ commit }) {
        await this.$axios.$get("api/products/get").then((data) => {
            const products_in_basket = data.products_in_basket;
            commit('updateProductsInBasket', products_in_basket);
            const products = data.products;
            commit('updateProducts', products);
        })
    },
}

export const getters = {
    getProducts(state) {
        return state.products
    },
    getProductsInBasket(state){
        return state.products_in_basket
    }
}