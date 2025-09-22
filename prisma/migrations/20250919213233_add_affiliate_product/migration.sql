-- CreateTable
CREATE TABLE "public"."AffiliateProduct" (
    "id" SERIAL NOT NULL,
    "aw_deep_link" TEXT,
    "product_name" TEXT,
    "aw_product_id" TEXT,
    "merchant_product_id" TEXT,
    "merchant_image_url" TEXT,
    "description" TEXT,
    "merchant_category" TEXT,
    "search_price" DECIMAL(12,2),
    "store_price" DECIMAL(12,2),
    "delivery_cost" DECIMAL(12,2),
    "merchant_name" TEXT,
    "merchant_id" TEXT,
    "category_name" TEXT,
    "category_id" TEXT,
    "aw_image_url" TEXT,
    "currency" TEXT,
    "merchant_deep_link" TEXT,
    "last_updated" TEXT,
    "display_price" TEXT,
    "data_feed_id" TEXT,

    CONSTRAINT "AffiliateProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AffiliateProduct_aw_product_id_idx" ON "public"."AffiliateProduct"("aw_product_id");

-- CreateIndex
CREATE INDEX "AffiliateProduct_merchant_id_idx" ON "public"."AffiliateProduct"("merchant_id");

-- CreateIndex
CREATE INDEX "AffiliateProduct_category_id_idx" ON "public"."AffiliateProduct"("category_id");
