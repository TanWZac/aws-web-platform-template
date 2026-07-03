## Summary

<!-- What does this PR do? -->

## Type of change

- [ ] Bug fix
- [ ] New feature / page
- [ ] Improvement / refactor
- [ ] Security fix
- [ ] CI / config change

## Testing

- [ ] Tests added / updated (`npm test` passes)
- [ ] `npm run typecheck` and `npm run lint` pass
- [ ] `npm run build` succeeds (static export)
- [ ] Tested in browser locally (`npm run dev`)

## API contract

- [ ] No API changes consumed
- [ ] New API endpoints used — verified against `contracts/api-contract.yaml`
- [ ] `NEXT_PUBLIC_API_BASE_URL` change required — SSM param updated

## Checklist

- [ ] No secrets or credentials in this PR
- [ ] New env vars added to `.env.example`
- [ ] Loading and error states handled for all new API calls
- [ ] `output: "export"` compatibility verified (no server-side logic)
