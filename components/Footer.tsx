export function Footer() {
  return (
    <footer className="mt-auto py-8 px-4 text-center font-code text-xs md:text-sm text-[var(--text-muted)] space-y-1.5">
      <p>
        Construido com Next.Js e Tailwind -  Conceito: {" "}
        <a
          href="https://neubrutalism.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--text-main)] transition-colors font-bold"
        >
          Neubrutalism
        </a>
      </p>
      <p>&copy; 2026 Icaro Henrique | CC BY-NC 4.0</p>
    </footer>
  );
}
