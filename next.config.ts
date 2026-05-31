import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do Turbopack neste projeto. Sem isso o Next detecta um
  // package.json solto em /Users/user e elege a HOME inteira como raiz,
  // passando a vigiar todos os arquivos dela (Downloads etc.) — o que
  // estoura CPU/RAM numa máquina de 8GB e trava o sistema.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
