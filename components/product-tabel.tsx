import { GetProducts } from "@/lib/data";

const ProductTable = async () => {
  const products = await GetProducts();
  if (!products?.length) return <h1 className="text-2xl">No Product Found</h1>;
  return (
    <table className="w-full bg-white mt-3">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Harga</th>
          <th className="py-3 px-6 text-left text-sm">Created At</th>
          <th className="py-3 px-6 text-left text-sm">Created By</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="py-3 px-6">{product.name}</td>
            <td className="py-3 px-6">{product.price}</td>
            <td className="py-3 px-6">{product.createdAt.toLocaleString()}</td>
            <td className="py-3 px-6">{product.user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
