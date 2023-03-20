"use client";
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button, Header } from '@mantine/core';
import { useState } from 'react';
import { notifications } from '@mantine/notifications'
import jwt from 'jsonwebtoken'

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  async function handleLogin() {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((t) => t.json())

    const token = res.token
    localStorage.setItem('token', token)

    if (token) {
      const json = jwt.decode(token) as { [key: string]: string }
      setMessage(`Welcome ${json.userId}`)
    } else {
      setMessage('Something went wrong.')
    }
  }

  async function showNotification() {
    notifications.show({
      title: 'Auth Notification',
      message: message
    })
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome To EntApex
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Contact Administration
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={() => {
          handleLogin()
          showNotification()
        }}>
          Log In
        </Button>
      </Paper>
      <h1>{message}</h1>
    </Container>
  )
}
