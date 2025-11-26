import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Базовый',
      description: 'Для начинающих',
      monthlyPrice: 499,
      annualPrice: 4990,
      features: [
        'До 10 товаров',
        'Базовая аналитика',
        'Email поддержка',
        '1 ГБ хранилища',
      ],
      icon: 'Zap',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Профессиональный',
      description: 'Для растущего бизнеса',
      monthlyPrice: 1499,
      annualPrice: 14990,
      features: [
        'До 100 товаров',
        'Продвинутая аналитика',
        'Приоритетная поддержка 24/7',
        '10 ГБ хранилища',
        'API доступ',
        'Кастомный домен',
      ],
      icon: 'Rocket',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Корпоративный',
      description: 'Для крупного бизнеса',
      monthlyPrice: 4999,
      annualPrice: 49990,
      features: [
        'Неограниченно товаров',
        'Полная аналитика + BI',
        'Личный менеджер',
        '100 ГБ хранилища',
        'API + WebHooks',
        'Белый лейбл',
        'Интеграции',
      ],
      icon: 'Crown',
      popular: false,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const savings = isAnnual ? Math.round(((plan.monthlyPrice * 12 - plan.annualPrice) / (plan.monthlyPrice * 12)) * 100) : 0;
    return { price, savings };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Sparkles" size={40} className="text-primary animate-pulse-glow" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              SubsHub
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Подписочный сервис нового поколения для вашего бизнеса
          </p>
        </header>

        <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in">
          <span className={`text-lg font-semibold transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Помесячно
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-primary"
          />
          <span className={`text-lg font-semibold transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Годовая подписка
          </span>
          {isAnnual && (
            <Badge variant="secondary" className="animate-scale-in bg-accent text-accent-foreground">
              Экономия до 17%
            </Badge>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const { price, savings } = getPrice(plan);
            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in cursor-pointer ${
                  plan.popular
                    ? 'border-primary border-2 shadow-lg shadow-primary/20'
                    : 'border-border hover:border-primary/50'
                } ${selectedPlan === plan.id ? 'ring-2 ring-primary' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 text-sm font-semibold animate-pulse-glow">
                      🔥 Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon name={plan.icon} size={28} className="text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {price.toLocaleString('ru-RU')}
                      </span>
                      <span className="text-xl text-muted-foreground">₽</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isAnnual ? 'в год' : 'в месяц'}
                      {savings > 0 && (
                        <span className="ml-2 text-accent font-semibold">
                          (-{savings}%)
                        </span>
                      )}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full text-base font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/dashboard');
                    }}
                  >
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Выбрать план
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20 animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Почему SubsHub?</CardTitle>
              <CardDescription className="text-base">
                Все что нужно для роста вашего бизнеса
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'TrendingUp',
                    title: 'Рост выручки',
                    description: 'Автоматические платежи увеличат доход на 40%',
                  },
                  {
                    icon: 'Users',
                    title: 'Лояльность',
                    description: 'Удержание клиентов до 85% с подписочной моделью',
                  },
                  {
                    icon: 'Sparkles',
                    title: 'Автоматизация',
                    description: 'Настройте один раз — работает всегда',
                  },
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-lg bg-card/50 hover:bg-card transition-all hover:scale-105"
                  >
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                      <Icon name={benefit.icon} size={32} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16 animate-fade-in">
          <Button
            size="lg"
            className="bg-gradient-to-r from-accent via-secondary to-primary hover:shadow-xl hover:shadow-accent/50 text-white font-bold text-lg px-8 py-6 animate-pulse-glow"
            onClick={() => navigate('/dashboard')}
          >
            <Icon name="Rocket" size={24} className="mr-2" />
            Начать зарабатывать сейчас
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;