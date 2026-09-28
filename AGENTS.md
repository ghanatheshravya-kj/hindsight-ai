<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting published git history — force pushing, or rebasing/amending/squashing commits that are already pushed — as it rewrites history on Lovable's side and the user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep prototype customer records in `src/lib/mock-data.ts` and UI-only conversation edits in component state, so a real API can replace the mock source without changing presentation.
- Keep the six dashboard destinations as separate TanStack routes sharing one dashboard shell, so navigation has stable URLs and page metadata.
