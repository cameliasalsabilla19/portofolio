import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { updatePortfolio } from "@/actions/portfolio";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPortfolioPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .single();

  if (!item) notFound();

  const updateAction = updatePortfolio.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Edit Portfolio</h1>
      <p className="text-white/50 text-sm mb-8">Perbarui data portfolio yang ada.</p>
      <PortfolioForm action={updateAction} defaultValues={item} portfolioId={id} />
    </div>
  );
}
