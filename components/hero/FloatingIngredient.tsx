import Image from 'next/image';

const ingredients = {
  fragment: '/images/ingredients/chocolate.webp',
  berry: '/images/ingredients/strawberry.webp',
};

export function FloatingIngredient({ kind }: { kind: keyof typeof ingredients }) {
  return (
    <div className={`ingredient ingredient--${kind}`} data-motion={kind} aria-hidden="true">
      <Image src={ingredients[kind]} alt="" fill sizes="(max-width: 820px) 17vw, 12vw" loading="eager" />
    </div>
  );
}
