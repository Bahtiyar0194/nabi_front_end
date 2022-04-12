import { actions } from "../store/cart";

export default {
    all_rights: 'Все права защищены.',
    choose_your_language: 'Выберите Ваш язык',
    continue: 'Продолжить',

    form: {
        email: 'E-Mail',
        name: 'Имя',
        last_name: 'Фамилия',
        phone: 'Телефон',
        password: 'Пароль',
        confirm_password: 'Подтвердите пароль',
        country: 'Страна',
        region: 'Регион',
        city: 'Город',
        street: 'Улица',
        house: 'Дом',
        flat: 'Квартира'
    },

    pages: {
        home: {
            title: 'Главная страница',
            hello: 'Добро пожаловать'
        }, 
        profile: {
            title: 'Мой профиль',
        }, 
        login: {
            title: 'Вход в аккаунт',
            sign_in: 'Войти',
            dont_have_an_account: "Нет аккаунта?",
            sign_out: 'Выйти из аккаунта'
        },
        forgot_password:{
            title: "Восстановление пароля",
            forgot: "Забыли пароль?"
        },
        register: {
            title:'Регистрация нового аккаунта',
            sign_up: 'Регистрация',
            have_an_account: 'Есть аккаунт?',
        },
        error:{
            error: 'Ошибка',
            not_found: 'Страница не найдена',
            server_error: 'Ошибка сервера'
        },
        dashboard:{
            title: 'Личный кабинет',
            main_wallet: 'Основной кошелёк'
        },
        products:{
            title: 'Магазин',
            add_to_cart: 'В корзину',
            go_to_cart: 'Перейти в корзину',
            in_cart: 'Уже в корзине',
            item_in_cart: 'Товар добавлен в корзину'
        },
        cart:{
            title: 'Корзина товаров',
            cart_empty_title: 'В корзине пока ничего нет',
            cart_empty_title_desc: 'Начните с главной страницы или воспользуйтесь каталогом',
            go_to_catalog: 'Перейти в магазин',
            go_to_main_page: 'Перейти на главную',
            product: 'Товар',
            product_name: 'Наименование',
            price: 'Цена',
            mark: 'Баллов',
            marks: 'Общий баллооборот',
            count: 'Количество',
            total_count: 'Общее количество товаров',
            sum: 'Сумма',
            total: 'Итого',
            order: 'Заказать',
            actions: 'Действия',
            delete_product: 'Удалить товар',
            not_funds: 'Не хватает средств в основном кошельке',
            top_up: 'Пополнить',
            contact_details: 'Контактные данные',
            choose_payment_method: 'Выберите способ оплаты',
            choose_shipping_method: 'Выберите способ доставки',
            choose_other_method: 'Данный метод оплаты временно не работает. Пожалуйста, возпользуйтесь другим методом.'
        },
        business: {
            title: 'Бизнес-место и обучение',
            access_denied: 'Доступ закрыт!',
            access_denied_desc: 'Доступ к обучающим материалам и маркетинг закрыт! Для открытия доступа Вам необходимо оплатить вход на проект.',
            pay_desc: 'Оплата входа на проект (открытие доступа к обучению и маркетингу)',
        }
    }
}