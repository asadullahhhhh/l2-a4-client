import SubCartPage from "@/modules/cartItems/cartpage";
import { cartService } from "@/service/cart.service"
import { userService } from "@/service/user.service";

const CartPage = async () => {

    const {data} = await cartService.getUserCart()
    const cartItems = data?.data
    const session = await userService.getSession()

    return (
        <div >
            <SubCartPage cartItems={cartItems} session={session}></SubCartPage>
        </div>
    )
}

export default CartPage;