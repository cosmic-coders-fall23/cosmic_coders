import {Body, Button, Container, Head, Html, Link, Preview, Section, Text,} from '@react-email/components';
import * as React from 'react';

interface VerifyEmailProps {
    username: string;
    link: string;
}

export const VerifyEmail = ({
                                username,
                                link,
                            }: VerifyEmailProps) => {
    return (
        <Html>
            <Head/>
            <Preview>Hi Bodhi, Thank you for registering! Please click the button below to verify your email address.</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Link href="https://modernpint.com" style={logo}>
                        COSMIC CODERS
                    </Link>
                    <Section>
                        <Text style={text}>Hi {username},</Text>
                        <Text style={text}>
                            Thank you for registering! Please click the button below to verify your email address.
                        </Text>
                        <Button style={button} href={link}>
                            <Text style={text}>Verify Email</Text>
                        </Button>
                        <Text style={text}>
                            This link will expire in 15 minutes.
                        </Text>
                        <Text style={text}>Have fun!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default VerifyEmail;

const main = {
    backgroundColor: '#1A1B1E',
    padding: '10px 0',
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
};

const container = {};

const text = {
    fontSize: '1rem',
    fontWeight: '350',
    color: '#ffffff',
    lineHeight: '1.55',
};

const button = {
    backgroundColor: 'rgb(25, 113, 194)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '210px',
    padding: '14px 7px',
};

const anchor = {
    textDecoration: 'underline',
};

const logo = {
    color: "rgb(25, 113, 194)",
    textDecoration: "none",
    fontWeight: 1000,
    fontSize: "3rem",
    lineHeight: 1.3,
};