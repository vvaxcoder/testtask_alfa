'use client';

import React, { useState } from "react";
import { Button, Form, FormInstance, Input, InputNumber, Space, Modal } from "antd";
import { useRouter } from "next/navigation";
import '@ant-design/v5-patch-for-react-19';

import { useProductStore } from "../store/ProductStore";

import Product from "../types/Product";
import "../style.css";

interface SubmitButtonProps {
    form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => {setSubmittable(true)})
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            {children}
        </Button>
    );
};

export default function CreateProductPage() {
    const {
        addProduct
    } = useProductStore();

    const router = useRouter();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddProduct = (values: Product) => {
        console.log(values);
        addProduct(values);
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ padding: 20 }}>
            <Button onClick={() => router.push('/products')} style={{ marginBottom: 20 }}>Назад к списку</Button>

            <div className="form-wrapper flex w-full justify-center align-center">
                <Form
                    id="create-form"
                    form={form}
                    layout="vertical"
                    onFinish={handleAddProduct}>
                    <Form.Item
                        name="title"
                        label="Название"
                        rules={[{ required: true, message: 'Введите название продукта' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Введите цену продукта' }]}>
                        <InputNumber />
                    </Form.Item>

                    <Form.Item name="description" label="Описание" rules={[{ required: true, message: 'Введите описание продукта' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="image" label="Ссылка на изображение" rules={[{ required: true, message: 'Введите изображение продукта' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="category" label="Категория">
                        <Input placeholder="Необязательно" />
                    </Form.Item>

                    <Form.Item name="rating" label="Рейтинг">
                        <Input placeholder="Необязательно" />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <SubmitButton form={form}>Добавить продукт</SubmitButton>
                        </Space>
                    </Form.Item>
                </Form>
            </div>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Товар успешно добавлен.</p>
            </Modal>
        </div>
    );
}