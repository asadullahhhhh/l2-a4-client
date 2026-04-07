import SubCartPage from "@/modules/cartItems/cartpage";
import { cartService } from "@/service/cart.service"

const CartPage = async () => {

    const {data} = await cartService.getUserCart()
    const cartItems = data?.data

    return (
        <div>
            <SubCartPage cartItems={cartItems}></SubCartPage>
        </div>
    )
}

export default CartPage;