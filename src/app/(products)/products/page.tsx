import { siteConfig } from "@/lib/site"
import { ListProducts } from "@/modules/products/views/list-products"
import { caller } from "@/trpc/server/query-server"

export default async function Page() {
  const products = await caller.products.list()
  return (
    <div>
      <section aria-labelledby="products-header">
        <h1 id="products-header" className="sr-only">
          Products.
        </h1>
      </section>
      <div className="p-4">
        <div className="border-b border-b-gray-200 pb-1.5">
          Welcome to
          {" "}
          <span className="font-bold">
            {siteConfig.name}
          </span>
        </div>
        <div className="mt-8">
          <div>
            <ListProducts />
          </div>
          <div className="mt-3">
            {products.map(product => (
              <div key={product.id}>{product.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
