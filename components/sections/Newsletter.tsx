"use client";

import { useState } from "react";
import { IconArrow } from "@/components/brand/Icons";
import { cn } from "@/lib/utils";

/* ============================================================================
   Newsletter — um fio e uma seta. Estados: repouso, foco, a enviar,
   enviado, erro. Nenhum deles altera a composição.
   ========================================================================== */

type Status = "idle" | "loading" | "done" | "error";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    // Ponto de integração: substituir por POST para o serviço de newsletter.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("done");
    setEmail("");
  }

  return (
    <div className={className}>
      <p className="t-label-sm muted">Newsletter</p>
      <p className="t-h4 mt-3 max-w-[24ch]">Receba as novidades da HERTMANN.</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 max-w-[26rem]">
        <div className="field relative flex items-center">
          <label htmlFor="newsletter-email" className="sr-only">
            O seu e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            value={email}
            required
            autoComplete="email"
            placeholder="O seu e-mail"
            aria-invalid={status === "error"}
            aria-describedby="newsletter-status"
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            className="pr-12"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            className={cn(
              "tap absolute right-0 grid h-10 w-10 place-items-center",
              "transition-[opacity,transform] duration-500 [transition-timing-function:var(--ease-editorial)]",
              "hover:translate-x-1 disabled:opacity-35",
            )}
            disabled={status === "loading"}
            aria-label="Subscrever"
          >
            <IconArrow size={17} />
          </button>
        </div>

        <p
          id="newsletter-status"
          aria-live="polite"
          className={cn(
            "t-label-sm mt-3 transition-opacity duration-500",
            status === "idle" ? "opacity-0" : "opacity-100",
          )}
        >
          {status === "error" && "Verifique o endereço indicado."}
          {status === "loading" && "A subscrever…"}
          {status === "done" && "Obrigado. Está subscrito."}
          {status === "idle" && " "}
        </p>
      </form>
    </div>
  );
}
