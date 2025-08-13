import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageSquare, Package, AlertCircle, CheckCircle, Clock, Trash2 } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New message from BuildPro Equipment",
      message: "Your excavator rental quote is ready for review.",
      time: "2 hours ago",
      unread: true,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      type: "delivery",
      title: "Equipment delivery scheduled",
      message: "Your Caterpillar 320 Excavator will be delivered tomorrow at 9:00 AM.",
      time: "5 hours ago",
      unread: true,
      avatar: null
    },
    {
      id: 3,
      type: "system",
      title: "Payment successful",
      message: "Your payment of ₹2,08,250 for Order #ORD-2024-003 has been processed.",
      time: "1 day ago",
      unread: false,
      avatar: null
    },
    {
      id: 4,
      type: "alert",
      title: "Rental reminder",
      message: "Your equipment rental ends in 2 days. Would you like to extend?",
      time: "2 days ago",
      unread: false,
      avatar: null
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      vendor: "BuildPro Equipment",
      lastMessage: "Your excavator rental quote is ready for review.",
      time: "2 hours ago",
      unread: 2,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      vendor: "Heavy Machinery Co.",
      lastMessage: "Thank you for your order. Delivery is confirmed for tomorrow.",
      time: "1 day ago",
      unread: 0,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      vendor: "Site Equipment Rentals",
      lastMessage: "Equipment inspection completed successfully.",
      time: "3 days ago",
      unread: 1,
      avatar: "/placeholder.svg"
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="h-4 w-4" />;
      case "delivery": return <Package className="h-4 w-4" />;
      case "alert": return <AlertCircle className="h-4 w-4" />;
      case "system": return <CheckCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Notifications & Messages</h1>
          <p className="text-muted-foreground">Stay updated with your rental activities and vendor communications</p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              {notifications.filter(n => n.unread).length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {notifications.filter(n => n.unread).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
              {messages.reduce((acc, m) => acc + m.unread, 0) > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {messages.reduce((acc, m) => acc + m.unread, 0)}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={notification.unread ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${notification.unread ? 'bg-primary' : 'bg-muted'}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${notification.unread ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {notification.unread && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>
                        {message.vendor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{message.vendor}</h3>
                        <div className="flex items-center gap-2">
                          {message.unread > 0 && (
                            <Badge variant="destructive">{message.unread}</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.lastMessage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;