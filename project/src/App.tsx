import React, { useState } from 'react';
import { Globe } from 'lucide-react';

type Language = 'ja' | 'en';
type CodeLanguage = 'java' | 'python' | 'javascript' | 'css';

type Translations = {
  title: string;
  subtitle: string;
  inputLabel: string;
  outputLabel: string;
  executeButton: string;
  languageSelect: {
    label: string;
    options: {
      [key in CodeLanguage]: string;
    };
  };
  placeholders: {
    input: string;
    output: string;
  };
};

const translations: Record<Language, Translations> = {
  ja: {
    title: 'SecureMask Pro',
    subtitle: 'ソースコードの機密要素を完全匿名化',
    inputLabel: '📥 入力コード',
    outputLabel: '📤 匿名化結果',
    executeButton: '🚀 匿名化実行',
    languageSelect: {
      label: 'プログラミング言語',
      options: {
        java: 'Java',
        python: 'Python',
        javascript: 'JavaScript',
        css: 'CSS'
      }
    },
    placeholders: {
      input: '// ここにコードを貼り付けてください',
      output: '// 匿名化されたコードがここに表示されます'
    }
  },
  en: {
    title: 'SecureMask Pro',
    subtitle: 'Complete Source Code Anonymization',
    inputLabel: '📥 Input Code',
    outputLabel: '📤 Anonymized Result',
    executeButton: '🚀 Execute Anonymization',
    languageSelect: {
      label: 'Programming Language',
      options: {
        java: 'Java',
        python: 'Python',
        javascript: 'JavaScript',
        css: 'CSS'
      }
    },
    placeholders: {
      input: '// Paste your code here',
      output: '// Anonymized code will appear here'
    }
  }
};

function App() {
  const [language, setLanguage] = useState<Language>('ja');
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('java');
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const t = translations[language];

  const handleAnonymize = () => {
    if (!inputCode.trim()) {
      return;
    }

    let anonymizedCode = inputCode;
    
    if (codeLanguage === 'css') {
      let classCounter = 1;
      let idCounter = 1;
      let varCounter = 1;
      let animCounter = 1;

      // CSS匿名化ルール
      anonymizedCode = anonymizedCode
        // クラス名の匿名化
        .replace(/\.([\w-]+)/g, () => `.selector${classCounter++}`)
        // ID名の匿名化
        .replace(/#([\w-]+)/g, () => `#selector${idCounter++}`)
        // カスタムプロパティ名の匿名化
        .replace(/--[\w-]+/g, () => `--var${varCounter++}`)
        // アニメーション名の匿名化
        .replace(/@keyframes\s+([\w-]+)/g, () => `@keyframes animation${animCounter++}`)
        // メディアクエリの中身は保持
        .replace(/(@media[^{]+{)([\s\S]+?})/g, (match, mediaQuery, content) => {
          return mediaQuery + content;
        });
    } else {
      // 既存の言語の匿名化ロジック
      let counter = 1;
      anonymizedCode = anonymizedCode
        .replace(/class\s+(\w+)/g, () => `class Class${counter++}`)
        .replace(/function\s+(\w+)/g, () => `function func${counter++}`)
        .replace(/var\s+(\w+)/g, () => `var v${counter++}`);
    }

    setOutputCode(anonymizedCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🛡️ {t.title}</h1>
              <p className="mt-1 text-sm text-gray-600">{t.subtitle}</p>
            </div>
            <button
              onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t.inputLabel}</h2>
            <div className="space-y-4">
              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full h-64 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder={t.placeholders.input}
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.languageSelect.label}
                  </label>
                  <select
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value as CodeLanguage)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {(Object.entries(t.languageSelect.options) as [CodeLanguage, string][]).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleAnonymize}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 self-end"
                >
                  {t.executeButton}
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t.outputLabel}</h2>
            <textarea
              value={outputCode}
              readOnly
              className="w-full h-64 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono bg-gray-50"
              placeholder={t.placeholders.output}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;