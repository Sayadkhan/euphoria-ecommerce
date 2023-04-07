import { getProduct } from "@/prisma/products";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";

const ProductDetails = ({ product }) => {
  return (
    <div className="wrapper my-10 grid lg:grid-cols-2 gap-10">
      <Image
        priority
        unoptimized
        loader={() => product.imageUrl}
        src={product.imageUrl}
        width={500}
        height={500}
        alt={product.title}
        className="w-full h-full object-cover"
      />

      <div className="flex flex-col gap-5">
        <span className="uppercase tracking-widest font-semibold text-sm text-cyan-500">
          {product.category}
        </span>
        <h2 className="text-4xl">{product.title}</h2>
        <div className="flex gap-10 items-center">
          <p className="text-2xl text-rose-500 font-medium">
            {formatCurrency(product.price)}
          </p>
          <div className="counter flex items-center bg-gray-100 text-2xl">
            <button className="bg-gray-700 text-white h-10 w-10 flex items-center justify-center hover:bg-cyan-500 duration-300">
              -
            </button>
            <span className="h-10 w-10 flex items-center justify-center">
              5
            </span>
            <button className="bg-gray-700 text-white h-10 w-10 flex items-center justify-center hover:bg-cyan-500 duration-300">
              +
            </button>
          </div>
        </div>
        <Link
          href="/"
          className="bg-cyan-500 text-center py-3 text-white text-xl font-medium hover:bg-cyan-600 duration-300 mt-5"
        >
          Add to Cart
        </Link>
        <p className="text-gray-500 mt-5">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getServerSideProps = async ({ query }) => {
  const product = await getProduct(query.productId);

  const updatedProduct = {
    ...product,
    updatedAt: product.updatedAt.toString(),
    createdAt: product.createdAt.toString(),
  };

  return {
    props: {
      product: updatedProduct,
    },
  };
};
