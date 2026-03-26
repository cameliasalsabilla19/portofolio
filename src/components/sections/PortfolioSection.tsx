import { createClient } from "@/lib/supabase/server";
import PortfolioClient from "./PortfolioClient";

export default async function PortfolioSection() {
  const supabase = await createClient();
  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .order("display_order", { ascending: true });

  return <PortfolioClient portfolios={portfolios ?? []} />;
}
