export interface BlogPost {
  slug: string;
  title: string;
  titleZh: string;
  date: string;
  excerpt: string;
  excerptZh: string;
  category: string;
  categoryZh: string;
  tags: string[];
  readTime: string;
  content: string;
  contentZh: string;
  author: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'polymarket-trading-strategies-2024',
    title: 'Advanced Trading Strategies for Polymarket in 2024',
    titleZh: '2024年 Polymarket 進階交易策略',
    date: '2024-12-10',
    excerpt: 'Exploring sophisticated trading techniques and market analysis approaches for prediction markets, including arbitrage opportunities and risk management.',
    excerptZh: '探索預測市場的複雜交易技術和市場分析方法，包括套利機會和風險管理。',
    category: 'Trading',
    categoryZh: '交易',
    tags: ['Polymarket', 'Trading', 'Crypto', 'Strategy'],
    readTime: '8 min read',
    author: 'Bryan / Weather',
    published: true,
    content: `
# Advanced Trading Strategies for Polymarket in 2024

Polymarket has emerged as one of the most liquid prediction markets, offering unique opportunities for traders and analysts. In this comprehensive guide, we'll explore advanced strategies for maximizing returns while managing risk effectively.

## Understanding Market Dynamics

Prediction markets operate differently from traditional financial markets. The key is understanding probability theory and how market sentiment can create mispricings.

### Key Concepts

1. **Implied Probability**: Every price represents a probability
2. **Market Inefficiencies**: Finding edges in sentiment-driven markets
3. **Liquidity Considerations**: Impact of trade size on execution

## Strategy 1: Arbitrage Opportunities

Cross-market arbitrage can be profitable when the same event is priced differently across platforms...

## Risk Management

Never risk more than 2-5% of your portfolio on a single position. Use stop-losses and position sizing to protect capital.

## Conclusion

Successful Polymarket trading requires discipline, analysis, and continuous learning. Start small, track your performance, and refine your approach based on data.
    `,
    contentZh: `
# 2024年 Polymarket 進階交易策略

Polymarket 已成為最具流動性的預測市場之一，為交易者和分析師提供了獨特的機會。在這份綜合指南中，我們將探討在有效管理風險的同時最大化回報的進階策略。

## 理解市場動態

預測市場的運作方式與傳統金融市場不同。關鍵是理解機率論以及市場情緒如何造成錯誤定價。

### 關鍵概念

1. **隱含機率**：每個價格代表一個機率
2. **市場無效率**：在情緒驅動的市場中尋找優勢
3. **流動性考量**：交易規模對執行的影響

## 策略一：套利機會

當同一事件在不同平台上定價不同時，跨市場套利可能會獲利...

## 風險管理

單一部位的風險永遠不要超過投資組合的2-5%。使用止損和部位規模來保護資本。

## 結論

成功的 Polymarket 交易需要紀律、分析和持續學習。從小開始，追蹤你的表現，並根據數據改進你的方法。
    `,
  },
  {
    slug: 'building-kaggle-competition-pipeline',
    title: 'Building an End-to-End Kaggle Competition Pipeline',
    titleZh: '構建端到端的 Kaggle 競賽流程',
    date: '2024-12-05',
    excerpt: 'A complete guide to structuring your Kaggle workflow, from data exploration to model deployment, with best practices and automation tools.',
    excerptZh: '從數據探索到模型部署，構建 Kaggle 工作流程的完整指南，包含最佳實踐和自動化工具。',
    category: 'Data Science',
    categoryZh: '數據科學',
    tags: ['Kaggle', 'Machine Learning', 'Python', 'Pipeline'],
    readTime: '12 min read',
    author: 'Bryan / Weather',
    published: true,
    content: `
# Building an End-to-End Kaggle Competition Pipeline

Competing effectively on Kaggle requires more than just good models—you need a robust, reproducible pipeline that allows rapid iteration and experimentation.

## Pipeline Architecture

A well-designed pipeline should include:

1. **Data Loading & Validation**: Consistent data ingestion
2. **Feature Engineering**: Modular, reusable transformations
3. **Model Training**: Hyperparameter tuning and cross-validation
4. **Ensemble & Stacking**: Combining multiple models
5. **Submission Generation**: Automated submission formatting

## Code Structure

\`\`\`python
# Example pipeline structure
class KagglePipeline:
    def __init__(self, config):
        self.config = config
        self.data = None
        self.models = []
    
    def load_data(self):
        # Load and validate data
        pass
    
    def engineer_features(self):
        # Feature engineering logic
        pass
    
    def train_models(self):
        # Model training with CV
        pass
    
    def generate_submission(self):
        # Create submission file
        pass
\`\`\`

## Best Practices

- Use version control for all experiments
- Track metrics and hyperparameters with MLflow or Weights & Biases
- Implement reproducible random seeds
- Validate on multiple folds to avoid overfitting

## Automation Tools

Consider using:
- **Optuna** for hyperparameter optimization
- **RAPIDS** for GPU-accelerated feature engineering
- **ONNX** for model deployment

## Conclusion

A solid pipeline saves time, reduces errors, and allows you to focus on what matters: building better models and features.
    `,
    contentZh: `
# 構建端到端的 Kaggle 競賽流程

在 Kaggle 上有效競爭不僅需要好的模型，還需要一個強大、可重現的流程，允許快速迭代和實驗。

## 流程架構

設計良好的流程應包括：

1. **數據載入與驗證**：一致的數據攝取
2. **特徵工程**：模組化、可重用的轉換
3. **模型訓練**：超參數調整和交叉驗證
4. **集成與堆疊**：結合多個模型
5. **提交生成**：自動化提交格式

## 代碼結構

\`\`\`python
# 流程結構範例
class KagglePipeline:
    def __init__(self, config):
        self.config = config
        self.data = None
        self.models = []
    
    def load_data(self):
        # 載入並驗證數據
        pass
    
    def engineer_features(self):
        # 特徵工程邏輯
        pass
    
    def train_models(self):
        # 使用 CV 進行模型訓練
        pass
    
    def generate_submission(self):
        # 創建提交文件
        pass
\`\`\`

## 最佳實踐

- 對所有實驗使用版本控制
- 使用 MLflow 或 Weights & Biases 追蹤指標和超參數
- 實現可重現的隨機種子
- 在多個折疊上驗證以避免過擬合

## 自動化工具

考慮使用：
- **Optuna** 進行超參數優化
- **RAPIDS** 進行 GPU 加速特徵工程
- **ONNX** 進行模型部署

## 結論

可靠的流程可以節省時間、減少錯誤，並讓你專注於最重要的事情：構建更好的模型和特徵。
    `,
  },
  {
    slug: 'nextjs-performance-optimization',
    title: 'Next.js 14+ Performance Optimization Techniques',
    titleZh: 'Next.js 14+ 性能優化技術',
    date: '2024-11-28',
    excerpt: 'Learn how to optimize your Next.js applications for maximum performance using Server Components, streaming, and modern caching strategies.',
    excerptZh: '學習如何使用 Server Components、串流和現代快取策略優化你的 Next.js 應用程式以獲得最佳性能。',
    category: 'Web Development',
    categoryZh: '網頁開發',
    tags: ['Next.js', 'React', 'Performance', 'Optimization'],
    readTime: '10 min read',
    author: 'Bryan / Weather',
    published: true,
    content: `
# Next.js 14+ Performance Optimization Techniques

With the introduction of Server Components and the App Router, Next.js 14+ offers unprecedented performance capabilities. Let's explore how to leverage these features effectively.

## Server Components Strategy

Server Components run on the server and don't ship JavaScript to the client. Use them by default for everything except:
- Components that use \`useState\`, \`useEffect\`, or other hooks
- Components that need event handlers
- Components that use browser-only APIs

## Image Optimization

\`\`\`jsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  placeholder="blur" // Automatic blur-up placeholder
/>
\`\`\`

## Streaming and Suspense

Break up your page into smaller chunks that can be streamed to the client:

\`\`\`jsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <DataComponent />
      </Suspense>
    </>
  )
}
\`\`\`

## Caching Strategies

Next.js 14+ has multiple caching layers:
1. **Request Memoization**: Same requests in a render deduped
2. **Data Cache**: Persistent across requests and deployments
3. **Full Route Cache**: HTML and RSC payload cached
4. **Router Cache**: Client-side navigation cache

## Measuring Performance

Use Vercel Analytics or Lighthouse to track:
- Core Web Vitals (LCP, FID, CLS)
- Time to First Byte (TTFB)
- Total Blocking Time (TBT)

## Conclusion

Performance optimization is an ongoing process. Start with these fundamentals, measure continuously, and iterate based on real user data.
    `,
    contentZh: `
# Next.js 14+ 性能優化技術

隨著 Server Components 和 App Router 的引入，Next.js 14+ 提供了前所未有的性能能力。讓我們探索如何有效地利用這些功能。

## Server Components 策略

Server Components 在伺服器上運行，不會向客戶端傳送 JavaScript。預設情況下使用它們，除了：
- 使用 \`useState\`、\`useEffect\` 或其他 hooks 的組件
- 需要事件處理程序的組件
- 使用僅限瀏覽器 API 的組件

## 圖片優化

\`\`\`jsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // 對於首屏圖片
  placeholder="blur" // 自動模糊佔位符
/>
\`\`\`

## 串流和 Suspense

將頁面分解為可以串流到客戶端的較小塊：

\`\`\`jsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <DataComponent />
      </Suspense>
    </>
  )
}
\`\`\`

## 快取策略

Next.js 14+ 有多個快取層：
1. **請求記憶化**：渲染中的相同請求去重
2. **數據快取**：跨請求和部署持久化
3. **完整路由快取**：HTML 和 RSC 有效負載快取
4. **路由器快取**：客戶端導航快取

## 測量性能

使用 Vercel Analytics 或 Lighthouse 追蹤：
- Core Web Vitals (LCP、FID、CLS)
- Time to First Byte (TTFB)
- Total Blocking Time (TBT)

## 結論

性能優化是一個持續的過程。從這些基礎開始，持續測量，並根據真實用戶數據進行迭代。
    `,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.published);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.published && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  blogPosts.forEach(post => {
    if (post.published) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}
