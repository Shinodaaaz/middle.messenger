import Block from "@/core/Block.ts";

export default function renderDOM(block: Block) {
  const root = document.querySelector("#app");

  root!.innerHTML = "";
  root!.appendChild(block.getContent());
}
//TODO ref query: any, block: any
export function render(query: any, block: any) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
