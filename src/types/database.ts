export type Experience = {
  id: string;
  start_date: string;
  end_date: string | null;      // null = "Present / Sekarang"
  title: string;
  description: string;
  display_order: number;
  created_at: string;
};

export type Portfolio = {
  id: string;
  title: string;
  image_url: string | null;
  description: string;
  start_date: string | null;
  end_date: string | null;      // null = "Sekarang / Present"
  display_order: number;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      experiences: {
        Row: Experience;
        Insert: Omit<Experience, "id" | "created_at">;
        Update: Partial<Omit<Experience, "id" | "created_at">>;
      };
      portfolios: {
        Row: Portfolio;
        Insert: Omit<Portfolio, "id" | "created_at">;
        Update: Partial<Omit<Portfolio, "id" | "created_at">>;
      };
    };
  };
};
