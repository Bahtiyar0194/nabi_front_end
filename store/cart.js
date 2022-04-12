export const state = () => ({
    order_id: '',
    orders: {},
    orders_sum: 0,
    orders_marks: 0,
    orders_count: 0,
    payment_types: {},
    delivery_types: {},
    delivery_countries: {},
    delivery_regions: {},
    delivery_cities: {},
    pickup_countries: {},
    pickup_cities: {}
})
export const mutations = {
    updateOrderId(state, order_id) {
        state.order_id = order_id
    },
    updateOrders(state, orders) {
        state.orders = orders
    },
    updateOrdersSum(state, orders_sum) {
        state.orders_sum = orders_sum
    },
    updateOrdersMarks(state, orders_marks) {
        state.orders_marks = orders_marks
    },
    updateOrdersCount(state, orders_count) {
        state.orders_count = orders_count
    },
    updatePaymentTypes(state, payment_types) {
        state.payment_types = payment_types
    },
    updateDeliveryTypes(state, delivery_types) {
        state.delivery_types = delivery_types
    },
    updateDeliveryCountries(state, delivery_countries) {
        state.delivery_countries = delivery_countries
    },
    updateDeliveryRegions(state, delivery_regions) {
        state.delivery_regions = delivery_regions
    },
    updateDeliveryCities(state, delivery_cities) {
        state.delivery_cities = delivery_cities
    },
    updatePickUpCountries(state, pickup_countries) {
        state.pickup_countries = pickup_countries
    },
    updatePickUpCities(state, pickup_cities) {
        state.pickup_cities = pickup_cities
    },
}

export const actions = {
    async fetchOrders({ commit }) {
        await this.$axios.$post("api/cart/get_orders").then((data) => {
            const order_id = data.order_id;
            const orders = data.orders;
            const total_order_sum = data.total_order_sum;
            const total_marks = data.total_marks;
            const total_product_count = data.total_product_count;
            commit('updateOrderId', order_id);
            commit('updateOrders', orders);
            commit('updateOrdersSum', total_order_sum);
            commit('updateOrdersMarks', total_marks);
            commit('updateOrdersCount', total_product_count);
        })
    },
    async fetchPaymentAndDeliveryTypes({ commit }) {
        await this.$axios.$get("api/cart/get_payment_and_delivery_types").then((data) => {
            const payment_types = data.payment_types;
            commit('updatePaymentTypes', payment_types);
            const delivery_types = data.delivery_types;
            commit('updateDeliveryTypes', delivery_types);
        })
    },

    async fetchDeliveryAndPickUpCountries({ commit }) {
        await this.$axios.$get("api/cart/get_countries_for_delivery_and_pickup").then((data) => {
            const countries_for_delivery = data.delivery_countries;
            commit('updateDeliveryCountries', countries_for_delivery);

            const countries_for_pickup = data.pickup_countries;
            commit('updatePickUpCountries', countries_for_pickup);
        })


    },
    async fetchDeliveryRegions({ commit }, data) {
        await this.$axios.$post("api/cart/get_regions_for_delivery", {
            c_id: data
        }).then((data) => {
            const regions_for_delivery = data;
            commit('updateDeliveryRegions', regions_for_delivery)
        })
    },
    async fetchDeliveryCities({ commit }, data) {
        await this.$axios.$post("api/cart/get_cities_for_delivery", {
            r_id: data
        }).then((data) => {
            const cities_for_delivery = data;
            commit('updateDeliveryCities', cities_for_delivery)
        })
    },
    async fetchPickUpCities({ commit }, data) {
        await this.$axios.$post("api/cart/get_cities_for_pickup", {
            c_id: data
        }).then((data) => {
            const cities_for_pickup = data;
            commit('updatePickUpCities', cities_for_pickup)
        })
    },
}

export const getters = {
    getOrderId(state) {
        return state.order_id
    },
    getOrders(state) {
        return state.orders
    },
    getOrdersSum(state) {
        return state.orders_sum
    },
    getOrdersMarks(state) {
        return state.orders_marks
    },
    getOrdersCount(state) {
        return state.orders_count
    },
    getPaymentTypes(state) {
        return state.payment_types
    },
    getDeliveryTypes(state) {
        return state.delivery_types
    },
    getDeliveryCountries(state) {
        return state.delivery_countries
    },
    getDeliveryRegions(state) {
        return state.delivery_regions
    },
    getDeliveryCities(state) {
        return state.delivery_cities
    },
    getPickUpCountries(state) {
        return state.pickup_countries
    },
    getPickUpCities(state) {
        return state.pickup_cities
    }
}