// #docplaster
// #docregion
import { TitleCasePipe } from './title-case.pipe';

// #docregion excerpt
describe('TitleCasePipe', () => {
  // 파이프는 순수 함수이며 스테이트도 없습니다. 따라서 BeforeEach는 필요 없습니다.
  const pipe = new TitleCasePipe();

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });

  it('transforms "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  });

  // ... 테스트 계속 ...
  // #enddocregion excerpt
  it('leaves "Abc Def" unchanged', () => {
    expect(pipe.transform('Abc Def')).toBe('Abc Def');
  });

  it('transforms "abc-def" to "Abc-def"', () => {
    expect(pipe.transform('abc-def')).toBe('Abc-def');
  });

  it('transforms "   abc   def" to "   Abc   Def" (preserves spaces) ', () => {
    expect(pipe.transform('   abc   def')).toBe('   Abc   Def');
  });
  // #docregion excerpt
});
// #enddocregion excerpt
