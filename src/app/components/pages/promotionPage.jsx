
import { useProduct } from "../../hooks/useProduct";
import Card from "../card";

const PromotionPage = () => {

  const { product } = useProduct();

  if (!product) {
    return <p className="text-xl font-bold text-center text-red-500 mt-20">Ничего нет</p>
  }

  const promotionData = product.filter(d => d.discount);

  return (
    <div className="px-52">
      <Card data={promotionData} />
    </div>
  );
}

export default PromotionPage;