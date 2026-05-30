export type LegalDocumentSlug =
  | "termos"
  | "privacidade"
  | "cookies"
  | "seguranca"
  | "reporte"
  | "compras"
  | "streaming"
  | "comunicacoes"
  | "responsaveis"
  | "historico";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type LegalDocument = {
  slug: LegalDocumentSlug;
  title: string;
  shortDescription: string;
  lastUpdated: string;
  sections: LegalSection[];
};
