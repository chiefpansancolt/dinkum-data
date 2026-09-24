import { CookingRecipeQuery, cookingRecipes } from '@/modules/recipes/cooking-recipes';
import { CraftingRecipeQuery, craftingRecipes } from '@/modules/recipes/crafting-recipes';
import { SignWritingRecipeQuery, signWritingRecipes } from '@/modules/recipes/sign-writing-recipes';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('cookingRecipes', () => cookingRecipes());
testQueryBaseContract('craftingRecipes', () => craftingRecipes());
testQueryBaseContract('signWritingRecipes', () => signWritingRecipes());

describe('CookingRecipeQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = cookingRecipes().get().slice(0, 1);
    expect(new CookingRecipeQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new CookingRecipeQuery().count()).toBeGreaterThan(0);
  });

  it('byLocation() returns only matching recipes', () => {
    const location = cookingRecipes().first()!.cookingLocation[0];
    for (const r of cookingRecipes().byLocation(location).get()) {
      expect(r.cookingLocation.map((l) => l.toLowerCase())).toContain(location.toLowerCase());
    }
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = cookingRecipes().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = cookingRecipes().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});

describe('CraftingRecipeQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = craftingRecipes().get().slice(0, 1);
    expect(new CraftingRecipeQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new CraftingRecipeQuery().count()).toBeGreaterThan(0);
  });

  it('bySource() returns only matching recipes', () => {
    const source = craftingRecipes().first()!.source![0];
    for (const r of craftingRecipes().bySource(source).get()) {
      expect(r.source?.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('bySource() excludes recipes with no source', () => {
    const noSource = new CraftingRecipeQuery([
      { ...craftingRecipes().first()!, source: undefined },
    ]);
    expect(noSource.bySource('anything').count()).toBe(0);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = craftingRecipes().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = craftingRecipes().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});

describe('SignWritingRecipeQuery filters', () => {
  it('accepts an explicit source array', () => {
    const subset = signWritingRecipes().get().slice(0, 1);
    expect(new SignWritingRecipeQuery(subset).count()).toBe(1);
  });

  it('uses default data when constructed without arguments', () => {
    expect(new SignWritingRecipeQuery().count()).toBeGreaterThan(0);
  });

  it('bySource() returns only matching recipes', () => {
    const source = signWritingRecipes().first()!.source![0];
    for (const r of signWritingRecipes().bySource(source).get()) {
      expect(r.source?.some((s) => s.toLowerCase().includes(source.toLowerCase()))).toBe(true);
    }
  });

  it('bySource() excludes recipes with no source', () => {
    const noSource = new SignWritingRecipeQuery([
      { ...signWritingRecipes().first()!, source: undefined },
    ]);
    expect(noSource.bySource('anything').count()).toBe(0);
  });

  it('sortByBaseSellPrice() sorts descending by default', () => {
    const sorted = signWritingRecipes().sortByBaseSellPrice().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeGreaterThanOrEqual(sorted[i].baseSellPrice);
    }
  });

  it('sortByBaseSellPrice() sorts ascending when requested', () => {
    const sorted = signWritingRecipes().sortByBaseSellPrice('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].baseSellPrice).toBeLessThanOrEqual(sorted[i].baseSellPrice);
    }
  });
});
