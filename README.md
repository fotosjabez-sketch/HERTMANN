# HERTMANN

Experiência digital da joalheria HERTMANN. Next.js 15 (App Router), TypeScript,
Tailwind CSS 4 e Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

---

## Direcção de arte

O Manual de Marca é a fonte de verdade. As decisões que dele decorrem:

| Elemento | Decisão |
| --- | --- |
| Paleta | `#051D41` azul-marinho, `#000000`, `#EBEBEB`, `#FFFFFF`. Nenhuma cor fora destas. As derivadas (`--color-ink-70`, `--color-rule`, …) são opacidades do azul-marinho, não cores novas. |
| Azul-marinho | Usado em três momentos apenas: a campanha Noturno, o bloco "O traço" do ateliê e o rodapé. Tudo o resto é branco e cinza. |
| Tipografia | **Cormorant SC** para a marca, títulos, manifestos e nomes de coleções. **Inter** para navegação, preços, rótulos e informação técnica. Duas famílias, nada mais. |
| Logotipo | Monograma HM servido como máscara CSS (`/public/brand/monogram-white.png`), pelo que herda a cor do contexto. A assinatura "Hertmann" é **texto vivo** em Cormorant SC — nítida em qualquer densidade e legível por leitores de ecrã. Restrições da p.14 respeitadas: sem rotação, recorte, sombra ou alteração de cor. |
| Ícones | "Linha Heritage" (p.15): traço fino de espessura constante, geometria sóbria, vazados, grid de 24×24. Ver `components/brand/Icons.tsx`. |
| Ilustrações | Estilo *Fine Line* (p.15): desenhos técnicos de traço fino. Ver `components/brand/Marks.tsx`. |

### Grelha e ritmo

12 colunas (6 em ecrãs até 900 px), margens `clamp(1.25rem, 4.2vw, 4.5rem)`,
contentor máximo de 1680 px. Intervalos verticais entre secções de
`clamp(6.5rem, 13vw, 14rem)`. A grelha é invisível — mas nada é colocado fora dela,
com uma excepção deliberada: o título da campanha Noturno, que atravessa a sua
coluna uma única vez em todo o site.

### Movimento

Só `opacity`, `transform` e `clip-path`. Curva única (`cubic-bezier(0.16, 1, 0.3, 1)`),
durações de 0,6 a 1,9 s. Rolagem suave por Lenis, desligada em dispositivos de toque
e sob `prefers-reduced-motion`, que também neutraliza todas as revelações — o conteúdo
aparece de imediato, sem deslocamento.

Primitivas em `components/motion/Reveal.tsx`: `Reveal`, `RevealGroup`, `RevealLines`,
`RevealVeil`, `Parallax`, `ScrollScale`.

> **Nota de implementação.** Em `RevealLines` e `RevealVeil` o observador vive
> sempre no elemento **exterior**. As linhas interiores estão escondidas pelo
> `overflow: hidden` do seu invólucro e, se fossem elas a ser observadas, nunca
> chegariam a intersectar a janela — ficariam invisíveis para sempre. São por isso
> conduzidas por variantes.

---

## Fotografia

Toda a imagem servida vem do próprio Manual de Marca — mockups, embalagem, boutique
e campanha da HERTMANN. Foram recortadas com uma chave suave que preserva as sombras
de contacto, para assentarem sobre as superfícies brancas e cinzentas da marca.

| Ficheiro | Onde aparece |
| --- | --- |
| `piece-ring-box.png` | Objecto do hero e peça *Perene* |
| `piece-rings.png` | Peça *Vertente* |
| `piece-pouch.png` | Campanha Noturno |
| `piece-bag.png` | Vista "Como chega" na página de produto |
| `set-packaging.png` | Coleção em destaque e abertura do ateliê |
| `campaign-portrait.jpg` | Coleção em destaque |
| `campaign-hero.jpg` | Página Sobre e imagem Open Graph |
| `boutique-wide.jpg` / `boutique-tall.jpg` | Ateliê e página Sobre |
| `hero-ring.png` | Objecto do Hero — o anel de assinatura, recortado sobre o vinheta original |

### Recortar uma fotografia nova

`scripts/cutout.py` é o processo que produziu todas as imagens acima. A chave
parte da cor do fundo lida nas margens, propaga-se apenas pelos pixels ligados à
borda — para não abrir buracos dentro da peça — e usa uma rampa suave, de modo
que a **sombra de contacto sobrevive**. É essa sombra que faz a peça assentar na
página em vez de flutuar sobre ela.

```bash
pip install pillow
python3 scripts/cutout.py foto-original.png public/images/nome.png
```

Se o fundo não for uniforme, `--inner` e `--outer` afinam os limiares da chave.

Quando o fundo não é uma cor plana — um vinheta, um gradiente, um fundo com
blobs de luz, como o da fotografia do anel no Hero — `cutout.py` deixa zonas
por cortar. `scripts/cutout_tolerance.py` resolve isso de outra forma: em vez
de comparar cada pixel a uma referência global, propaga-se a partir da borda
comparando cada pixel ao vizinho já classificado como fundo. Segue qualquer
gradiente, seja qual for a sua forma, e pára exactamente onde o salto de
luminância é grande — a silhueta nítida da peça.

```bash
pip install pillow numpy
python3 scripts/cutout_tolerance.py entrada.png public/images/saida.png
```

### As pranchas desenhadas

Nem todas as peças têm fotografia. As que não têm são apresentadas pelo **desenho de
ateliê** que lhes deu origem — dez construções distintas (`band`, `solitaire`,
`pendant`, `pendantGem`, `choker`, `hoop`, `drop`, `stud`, `links`, `bangle`), cada
uma desenhada no traço definido pelo manual e animada ao entrar em cena.

Não é um marcador de posição: é a forma como o catálogo se apresenta enquanto a
produção fotográfica decorre, e é coerente com o sistema de ilustração da marca.

**Para colocar uma fotografia real**, basta preencher `image` na peça, em
`lib/data/catalogue.ts`. Nenhum componente precisa de ser alterado:

```ts
image: {
  src: "/images/nome-do-ficheiro.png",
  cutout: true,   // true = recorte com fundo transparente, assenta na prancha de estúdio
                  // false = fotografia de enquadramento completo, preenche a prancha
  alt: "Descrição da peça para quem não vê a imagem",
},
```

---

## Estrutura

```
app/
  page.tsx                    Home — 11 secções, do hero ao rodapé
  joias/                      Catálogo e catálogo por categoria
  colecoes/                   Índice de coleções e página de coleção
  produto/[slug]/             Página de peça
  sobre/  atelie/  contato/   Institucional
  termos/  privacidade/       Legal
  sitemap.ts  robots.ts
components/
  brand/      Logotipo, ícones Linha Heritage, desenhos Fine Line
  layout/     Cabeçalho, menu móvel, busca, rodapé, camada modal, rolagem suave
  motion/     Primitivas de revelação e parallax
  sections/   As secções da home e os blocos institucionais
  product/    Prancha, cartão, grelha, galeria, painel de peça
  commerce/   Sacola e favoritos (estado local), gaveta da sacola
  ui/         Botões e rótulos
lib/data/     Catálogo, coleções, categorias, configuração do site
```

### Estado de loja

Sacola e favoritos vivem em `localStorage`, no dispositivo de quem visita — nunca
saem do navegador. A escrita está protegida contra armazenamento indisponível
(janela privada, dados bloqueados): a loja continua a funcionar em memória.

---

## Pontos de integração

Três lugares esperam um serviço real; até lá simulam a resposta e mostram os
estados corretos:

- `components/sections/Newsletter.tsx` — subscrição
- `components/sections/ContactForm.tsx` — envio de mensagem
- `components/commerce/BagDrawer.tsx` — "Finalizar compra"

---

## Acessibilidade

Semântica correta (`header`/`main`/`nav`/`footer`, títulos em ordem, botões e links
reais), *skip link*, foco visível como um fio de 1 px, foco preso e devolvido nas
camadas modais, `Escape` fecha, rolagem do corpo bloqueada enquanto abertas,
`aria-live` nas mudanças de quantidade e nos estados de formulário, `alt` descritivo
em todas as imagens e áreas de toque de 44 px em ecrãs pequenos.

## SEO

Metadados por página com `title` em template, Open Graph e Twitter Card, canónicos,
`sitemap.xml`, `robots.txt`, e JSON-LD de `JewelryStore` (global), `Product` e
`BreadcrumbList` (página de peça).
