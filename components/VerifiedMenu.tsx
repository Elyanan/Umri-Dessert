import Image from 'next/image';
import type { MenuProduct } from '../lib/content';

const birr = new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' });
const availability = { available: 'Available', seasonal: 'Seasonal', unavailable: 'Currently unavailable', unknown: '' } as const;

export function VerifiedMenu({ entries }: { entries: readonly MenuProduct[] }) {
  const groups = new Map<string, MenuProduct[]>();

  for (const entry of entries) {
    const category = entry.category.trim();
    if (entry.verification !== 'owner-verified' || !category) continue;
    const group = groups.get(category);
    if (group) group.push(entry);
    else groups.set(category, [entry]);
  }

  if (!groups.size) return null;
  const categories = [...groups.entries()];

  return (
    <section className="content-shell verified-menu" aria-labelledby="menu-heading">
      <div className="interior-section-heading"><h2 id="menu-heading">Current <em>offerings.</em></h2></div>
      <nav className="menu-categories" aria-label="Menu categories">
        {categories.map(([category], index) => <a className="outline-button" href={`#menu-category-${index + 1}`} key={category}>{category}</a>)}
      </nav>
      {categories.map(([category, products], index) => (
        <section key={category} id={`menu-category-${index + 1}`} className="verified-menu-category">
          <h3>{category}</h3>
          <div>
            {products.map((product) => {
              const photo = product.images[0];
              return (
                <article key={product.id}>
                  {photo && <div className="study-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 650px) 85vw, 30vw" /></div>}
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  {product.priceBirr !== null && <p>{birr.format(product.priceBirr)}</p>}
                  {availability[product.availability] && <small>{availability[product.availability]}</small>}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
