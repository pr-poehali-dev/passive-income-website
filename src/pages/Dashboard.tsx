import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [subscription] = useState({
    plan: 'Профессиональный',
    price: 1499,
    status: 'active',
    nextPayment: '27 декабря 2024',
    daysLeft: 30,
    features: [
      { name: 'Товары', used: 45, limit: 100 },
      { name: 'Хранилище', used: 3.2, limit: 10 },
      { name: 'API запросы', used: 12500, limit: 50000 },
    ],
  });

  const [paymentHistory] = useState([
    { date: '27 ноября 2024', amount: 1499, status: 'success', method: 'Visa ****1234' },
    { date: '27 октября 2024', amount: 1499, status: 'success', method: 'Visa ****1234' },
    { date: '27 сентября 2024', amount: 1499, status: 'success', method: 'Visa ****1234' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Личный кабинет</h1>
              <p className="text-muted-foreground">Управляйте своей подпиской</p>
            </div>
            <Badge className={`${getStatusColor(subscription.status)} text-white px-4 py-2 text-sm`}>
              <Icon name="CheckCircle2" size={16} className="mr-2" />
              Активна
            </Badge>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardDescription>Текущий план</CardDescription>
              <CardTitle className="text-2xl">{subscription.plan}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">{subscription.price}</span>
                <span className="text-muted-foreground">₽/мес</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <CardDescription>Следующий платеж</CardDescription>
              <CardTitle className="text-2xl">{subscription.nextPayment}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={20} className="text-muted-foreground" />
                <span className="text-muted-foreground">Через {subscription.daysLeft} дней</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardDescription>Экономия за год</CardDescription>
              <CardTitle className="text-2xl text-accent">2 388 ₽</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Icon name="TrendingDown" size={20} className="text-accent" />
                <span className="text-muted-foreground">при годовой оплате</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" size={24} className="text-primary" />
                Использование ресурсов
              </CardTitle>
              <CardDescription>Ваши лимиты и текущее использование</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subscription.features.map((feature, i) => {
                const percentage = (feature.used / feature.limit) * 100;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{feature.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {feature.name === 'Хранилище'
                          ? `${feature.used} ГБ / ${feature.limit} ГБ`
                          : `${feature.used.toLocaleString()} / ${feature.limit.toLocaleString()}`}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Icon name="ArrowUpCircle" size={18} className="mr-2" />
                Увеличить лимиты
              </Button>
            </CardFooter>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CreditCard" size={24} className="text-primary" />
                Способ оплаты
              </CardTitle>
              <CardDescription>Управление платежными данными</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ****1234</p>
                    <p className="text-sm text-muted-foreground">Истекает 12/25</p>
                  </div>
                </div>
                <Badge variant="secondary">По умолчанию</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={16} className="text-green-500" />
                  <span>Автоматическое списание включено</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Bell" size={16} className="text-blue-500" />
                  <span>Уведомления за 3 дня до платежа</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Icon name="Edit" size={18} className="mr-2" />
                Изменить
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={24} className="text-primary" />
              История платежей
            </CardTitle>
            <CardDescription>Последние транзакции по подписке</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon name="CheckCircle2" size={20} className="text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.date}</p>
                        <p className="text-sm text-muted-foreground">{payment.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{payment.amount} ₽</p>
                      <Badge variant="outline" className="text-xs">
                        Успешно
                      </Badge>
                    </div>
                  </div>
                  {i < paymentHistory.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Icon name="Download" size={18} className="mr-2" />
              Скачать все чеки
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 flex justify-center gap-4 animate-fade-in">
          <Button
            variant="outline"
            size="lg"
            className="hover:border-yellow-500 hover:text-yellow-500"
          >
            <Icon name="Pause" size={20} className="mr-2" />
            Приостановить подписку
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hover:border-red-500 hover:text-red-500"
          >
            <Icon name="X" size={20} className="mr-2" />
            Отменить подписку
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
