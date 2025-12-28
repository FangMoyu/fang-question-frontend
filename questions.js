// 神经网络知识题目数据
const questionsData = {
    "第一章": {
        singleChoice: [
            {
                id: 1,
                question: "以下____算法是基于规则的分类器。",
                options: ["A. 逻辑回归", "B. k-means", "C. 神经网络", "D. 决策树"],
                answer: "D",
                explanation: "决策树是基于规则的分类器。"
            },
            {
                id: 2,
                question: "有关前馈神经网络的认识正确的是____。",
                options: ["A. 神经网络训练后很容易得到分类的规则", "B. 神经网络模型的分类能力一定比决策树好", "C. 一个结构明确的神经网络的训练结果是唯一的", "D. 神经网络训练过程是拟合训练数据模式的过程"],
                answer: "D",
                explanation: "神经网络训练过程是拟合训练数据模式的过程。"
            },
            {
                id: 3,
                question: "下面_____图像是sigmoid激活函数。",
                options: ["A. 图2", "B. 图3", "C. 图1", "D. 图4"],
                answer: "C",
                explanation: "图1是sigmoid激活函数的图像。",
                img: "image/sigmoid.png",
            },
            {
                id: 4,
                question: "_____对前馈神经网络的描述是不正确的。",
                options: ["A. 各个神经元接受前一级神经元的输入，并输出到下一级", "B. 同一层内的神经元相互不连接", "C. 层与层之间通过'全连接'进行连接，即两个相邻层之间神经元完全成对连接", "D. 同一层内神经元之间存在全连接"],
                answer: "D",
                explanation: "同一层内神经元相互不连接，不存在全连接。"
            },
            {
                id: 5,
                question: "神经网络训练时，数据的类别标签可以用独热编码，编码中____。",
                options: ["A. 只有1个1，其他为0", "B. 一般用8位二进制数", "C. 只有1个0，其他为1", "D. 只要是二进制就可以"],
                answer: "A",
                explanation: "独热编码中只有1个1，其他为0。"
            },
            {
                id: 6,
                question: "在一个神经网络中，确定每一个神经元的权重和偏差是模型拟合训练样本的目标，比较有效的办法是____。",
                options: ["A. 赋予一个初始值，然后迭代更新权重，直至损失函数取得极小", "B. 搜索所有权重和偏差的组合，直到得到最佳值", "C. 根据人工经验随机赋值", "D. 下一层神经元继承上一层神经元的权重和偏差"],
                answer: "A",
                explanation: "赋予一个初始值，然后迭代更新权重，直至损失函数取得极小。"
            },
            {
                id: 7,
                question: "多个神经元堆叠在一起构成了神经网络，用神经网络模拟同或门（XNOR）。所有神经元的激活函数为阶跃函数。假设X1是0，X2是1，则神经网络的输出_____。",
                options: ["A. 1", "B. 0", "C. 2", "D. -1"],
                answer: "B",
                explanation: "0和1的同或（XNOR）结果是0。",
                img: "image/xor.png"
            },
            {
                id: 8,
                question: "以下关于人工神经网络的描述正确的是____。",
                options: ["A. 只能用于分类任务", "B. 神经网络对训练数据中的噪声不敏感，因此不用考虑数据质量", "C. 神经网络训练后很容易得到分类的规则", "D. 训练人工神经网络是一个很耗时的过程"],
                answer: "D",
                explanation: "训练人工神经网络是一个很耗时的过程。"
            },
            {
                id: 9,
                question: "神经网络的一次误差反向传播算法可以____。",
                options: ["A. 修改相邻2层的神经元的参数", "B. 修改一层神经元的参数", "C. 修改网络中所有神经元的参数", "D. 修改网络中所有神经元的激活函数"],
                answer: "C",
                explanation: "一次误差反向传播算法可以修改网络中所有神经元的参数。"
            },
            {
                id: 10,
                question: "在神经网络学习中，每个神经元会完成若干功能，下面_____不是神经元所能够完成的功能。",
                options: ["A. 对前序相邻神经元所传递信息进行加权累加", "B. 将加权累加信息向后续相邻神经元传递", "C. 向前序相邻神经元反馈加权累加信息", "D. 通过激活函数对加权累加信息进行非线性变换"],
                answer: "C",
                explanation: "神经元不会向前序相邻神经元反馈加权累加信息。"
            },
            {
                id: 11,
                question: "_____用来评估神经网络的计算模型对样本的预测值和真实值之间的误差大小。",
                options: ["A. 损失函数", "B. 优化函数", "C. 反向传播", "D. 梯度下降"],
                answer: "A",
                explanation: "损失函数用来评估神经网络的计算模型对样本的预测值和真实值之间的误差大小。"
            },
            {
                id: 12,
                question: "在前馈神经网络中，误差反向传播（BP算法）将误差从输出端向输入端进行传输的过程中，算法会调整神经网络的_____。",
                options: ["A. 输入数据大小", "B. 同一层神经元之间的连接权重", "C. 神经元和神经元之间连接的有无", "D. 相邻层神经元和神经元之间的连接权重"],
                answer: "D",
                explanation: "BP算法调整相邻层神经元和神经元之间的连接权重。"
            },
            {
                id: 13,
                question: "梯度下降算法的正确计算步骤是_____。" +
                    "1. 计算预测值和真实值之间的误差\n" +
                    "2. 迭代更新，直到找到最佳权重\n" +
                    "3. 把输入传入网络，得到输出值\n" +
                    "4. 初始化随机权重和偏差\n" +
                    "5. 对每一个产生误差的神经元，改变其权重值以减小误差",
                options: ["A. 5)4)3)2)1)", "B. 1)2)3)4)5)", "C. 3)2)1)5)4)", "D. 4)3)1)5)2)"],
                answer: "D",
                explanation: "梯度下降算法步骤：4.初始化权重 → 3.前向传播 → 1.计算误差 → 5.反向传播 → 2.迭代更新。"
            },
            {
                id: 14,
                question: "以下_________问题不适合应用神经网络。",
                options: ["A. 辅助确定是否给银行的客户贷款", "B. 股票走势的预测", "C. 对基金公司的客户进行分组，了解每组客户的特点", "D. 预测电信客户流失的可能性"],
                answer: "C",
                explanation: "对客户进行分组是聚类问题，更适合无监督学习算法。"
            },
            {
                id: 15,
                question: "下面对感知机网络（Perceptron Networks）描述不正确的是_____。",
                options: ["A. 感知机网络没有隐藏层", "B. 感知机网络具有一层隐藏层", "C. 感知机网络是一种特殊的前馈神经网络", "D. 感知机网络不能拟合复杂数据"],
                answer: "B",
                explanation: "感知机网络没有隐藏层，只有输入层和输出层。"
            }
        ],
        multipleChoice: [
            {
                id: 16,
                question: "在神经网络中，以下____技术用于解决过拟合。",
                options: ["A. Dropout", "B. 加大学习率", "C. 规范化", "D. 正则化"],
                answer: ["A", "C", "D"],
                explanation: "Dropout、规范化和正则化都用于解决过拟合。"
            },
            {
                id: 17,
                question: "如果神经网络的学习率太大，____。",
                options: ["A. 网络一定收敛", "B. 网络收敛速度慢", "C. 网络收敛速度快", "D. 网络可能无法收敛"],
                answer: ["C", "D"],
                explanation: "学习率太大会导致收敛速度快，但也可能无法收敛。"
            },
            {
                id: 18,
                question: "训练样本中，正负样本数量的比例较大，这称为样本类别不平衡问题，可采用____解决。",
                options: ["A. 过采样，即增加正样本数量，使正负样本接近再学习", "B. 改变评价标准，用AUC/ROC来进行评价", "C. 设置阈值。基于原始数据集学习，当使用已训练好的分类器进行测试时，将正负样本数量的比例作为阈值嵌入到决策过程中", "D. 欠采样，即去除反例样本数量，使正负样本接近再学习"],
                answer: ["A", "B", "C", "D"],
                explanation: "过采样、改变评价标准、设置阈值和欠采样都可以解决样本类别不平衡问题。"
            },
            {
                id: 19,
                question: "神经网络的训练结果模型文件，一般包括___。",
                options: ["A. 超参数", "B. 偏置参数", "C. 计算图", "D. 权重矩阵"],
                answer: ["B", "C", "D"],
                explanation: "模型文件一般包括偏置参数、计算图和权重矩阵。"
            },
            {
                id: 20,
                question: "神经网络由许多神经元组成，下列关于神经元的陈述中____是正确的。",
                options: ["A. 一个神经元只能有一个输入和一个输出", "B. 一个神经元可以有多个输入和一个输出", "C. 一个神经元可以有多个输入和多个输出", "D. 一个神经元可以有一个输入和多个输出"],
                answer: ["B", "C", "D"],
                explanation: "神经元可以有多种输入输出组合。"
            },
            {
                id: 21,
                question: "下列____可以使神经网络模型拟合复杂函数的能力增加。",
                options: ["A. Dropout的比例增加", "B. 加大学习率", "C. 增加神经元的数量", "D. 隐藏层层数增加"],
                answer: ["C", "D"],
                explanation: "增加神经元的数量和隐藏层层数可以增加模型拟合复杂函数的能力。"
            },
            {
                id: 22,
                question: "用于监督分类的算法有___。",
                options: ["A. 神经网络", "B. 决策树", "C. K-means", "D. 线性回归"],
                answer: ["A", "B"],
                explanation: "神经网络和决策树是监督分类算法，K-means是聚类算法，线性回归是回归算法。"
            },
            {
                id: 23,
                question: "神经网络的激活函数，通常具有____特性。",
                options: ["A. 非线性", "B. 线性", "C. 可导", "D. 不可导"],
                answer: ["A", "C"],
                explanation: "激活函数通常具有非线性和可导特性，便于反向传播。"
            }
        ],
        judgment: [
            {
                id: 24,
                question: "神经网络被称为通用函数拟合器，所以它理论上可以表示任何决策边界。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。神经网络是通用函数拟合器。"
            },
            {
                id: 25,
                question: "全连接神经网络输入层的神经元个数一般与一个输入样本的特征个数相同。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。输入层神经元个数与样本特征个数相同。"
            }
        ]
    },
    "第二章": {
        singleChoice: [
            {
                id: 1,
                question: "如果神经网络的性能有____表现，说明出现过拟合。",
                options: ["A. 训练集精度下降、验证集精度升高", "B. 训练集精度升高、验证集精度下降", "C. 训练集精度下降、验证集精度下降", "D. 训练集精度升高、验证集精度升高"],
                answer: "B",
                explanation: "训练集精度升高、验证集精度下降说明出现过拟合。"
            },
            {
                id: 2,
                question: "TensorBoard是Tensorflow的一个基于______使用的可视化工具，可以将模型及其训练过程中状态进行可视化。",
                options: ["A. 微服务", "B. APP", "C. 客户机", "D. 浏览器"],
                answer: "D",
                explanation: "TensorBoard是基于浏览器的可视化工具。"
            },
            {
                id: 3,
                question: "实现标量回归预测任务的神经网络，评价指标一般选择____。",
                options: ["A. 召回率", "B. 交叉熵", "C. 平均绝对误差", "D. 精确率"],
                answer: "C",
                explanation: "标量回归任务的评价指标一般选择平均绝对误差。"
            },
            {
                id: 4,
                question: "实现标量回归预测任务的神经网络，损失函数一般选择____。",
                options: ["A. sigmoid", "B. binary_crossentropy", "C. mse", "D. relu"],
                answer: "C",
                explanation: "标量回归任务的损失函数一般选择mse（均方误差）。"
            },
            {
                id: 5,
                question: "当数据集各个特征的量纲不一致时，应该在数据预处理时对数据进行____处理。",
                options: ["A. 向量化", "B. 矩阵化", "C. 标准化", "D. 降维"],
                answer: "C",
                explanation: "特征量纲不一致时应该进行标准化处理。"
            },
            {
                id: 6,
                question: "神经网络训练时采用k折交叉验证时，____。",
                options: ["A. 随机选任一份做验证集，其他份做训练集", "B. 随机选k份做训练集，其他份做验证集", "C. 依次选一份做验证集，其他份做训练集", "D. 随机选任一份做训练集，其他份做验证集"],
                answer: "C",
                explanation: "k折交叉验证是依次选一份做验证集，其他份做训练集。"
            },
            {
                id: 7,
                question: "实现多分类任务的神经网络，输出层的神经元个数一般选择____。",
                options: ["A. 10以内", "B. 与类别数一致", "C. 2个", "D. 类别数的2倍"],
                answer: "B",
                explanation: "输出层神经元个数应与类别数一致。"
            },
            {
                id: 8,
                question: "实现多分类任务的神经网络，隐藏层的神经元个数一般应该____分类数。",
                options: ["A. 等于", "B. 小于", "C. 大于", "D. 不用考虑"],
                answer: "C",
                explanation: "隐藏层的神经元个数一般应该大于分类数，以获得更好的表达能力。"
            },
            {
                id: 9,
                question: "实现二分类任务的神经网络中，输出层激活函数一般选择____。",
                options: ["A. tanh", "B. softmax", "C. sigmoid", "D. relu"],
                answer: "C",
                explanation: "二分类任务输出层一般使用sigmoid激活函数。"
            },
            {
                id: 10,
                question: "实现多分类任务的神经网络，损失函数一般选择____。",
                options: ["A. binary_crossentropy", "B. sigmoid", "C. categorical_crossentropy", "D. mse"],
                answer: "C",
                explanation: "多分类任务的损失函数一般选择categorical_crossentropy。"
            }
        ],
        multipleChoice: [
            {
                id: 11,
                question: "在进行神经网络训练之前，一般需要把训练集再分割为____。",
                options: ["A. 测试集", "B. 训练集", "C. 备用集", "D. 验证集"],
                answer: ["B", "D"],
                explanation: "训练集需要再分割为训练集和验证集。"
            },
            {
                id: 12,
                question: "在模型训练中传入回调函数可以监控模型训练过程，回调函数使用logs中信息，这些信息包括______开始或结束时记录的模型状态或性能。",
                options: ["A. batch", "B. train", "C. net", "D. epoch"],
                answer: ["A",  "B", "D"],
                explanation: "回调函数可以在batch或epoch开始或结束时记录模型状态。"
            },
            {
                id: 13,
                question: "神经网络的数据预处理，一般包括____步骤。",
                options: ["A. 处理缺失值", "B. 将数据向量化", "C. 将数据值转化为浮点数或整数", "D. 将数据值标准化"],
                answer: ["A", "B", "C", "D"],
                explanation: "数据预处理包括处理缺失值、向量化、类型转换和标准化。"
            },
            {
                id: 14,
                question: "下列____方法可以用来降低深度学习模型的过拟合问题。",
                options: ["A. 增加更多的数据", "B. 减小网络", "C. 添加Dropout", "D. 对损失函数添加权重正则化"],
                answer: ["A", "B", "C", "D"],
                explanation: "增加数据、减小网络、Dropout、正则化都可以降低过拟合。"
            }
        ],
        judgment: [
            {
                id: 15,
                question: "上海积累了历年的气候大数据，并使用这些数据训练建立了神经网络模型进行天气预测，那么这个模型也可用于其他地区的天气预测。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。模型是针对特定地区训练的，不能直接用于其他地区。"
            },
            {
                id: 16,
                question: "当训练集数据量小时，神经网络训练时可以采用k折交叉验证，k值的选择可以采用实验确定。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。k值可以通过实验确定。"
            },
            {
                id: 17,
                question: "训练早停可以设定性能不再提升时停止模型训练，是一种避免模型过拟合的训练监控方法。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。早停是防止过拟合的有效方法。"
            },
            {
                id: 18,
                question: "特征工程的目标就是减少数据集中特征的个数。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。特征工程的目标是创建更好的特征，不仅仅是减少特征数量。"
            },
            {
                id: 19,
                question: "Keras的TensorBoard回调函数生成一个数据库，启动TensorBoard服务器读取数据库后，通过浏览器可视化展示训练情况。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。TensorBoard生成的是日志文件，不是数据库。"
            },
            {
                id: 20,
                question: "神经网络模型训练中不应该出现过拟合，这网络结构不合理。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。适度的过拟合在训练过程中是正常的，关键是要控制程度。"
            }
        ]
    },
    "第三章": {
        singleChoice: [
            {
                id: 1,
                question: "———网络使得采用反向传播算法进行超深度神经网络训练成为可能。",
                options: ["A. VGG", "B. AlexNet", "C. ResNet", "D. GoogleNet"],
                answer: "C",
                explanation: "ResNet（残差网络）使得超深度神经网络训练成为可能。"
            },
            {
                id: 2,
                question: "下列____在神经网络中引入了非线性。",
                options: ["A. 随机梯度下降", "B. Relu函数", "C. 卷积计算", "D. 损失函数"],
                answer: "B",
                explanation: "激活函数（如Relu）在神经网络中引入非线性。"
            },
            {
                id: 3,
                question: "CNN中，____是局部连接，所以提取的是局部信息。",
                options: ["A. Dropout层", "B. 池化层", "C. 全连接层", "D. 卷积层"],
                answer: "D",
                explanation: "卷积层是局部连接，提取局部信息。"
            },
            {
                id: 4,
                question: "以下____情况下，神经网络模型被称为深度学习模型。",
                options: ["A. 激活函数更复杂", "B. 当问题是图形识别或分类问题时", "C. 加入更多层，使神经网络深度加深", "D. 输入层可以接收维度更高的数据"],
                answer: "C",
                explanation: "当网络层数增加、深度加深时，称为深度学习模型。"
            },
            {
                id: 5,
                question: "深度学习算法对于图像进行特征提取采用的方法是_____。",
                options: ["A. 网络自动提取", "B. 人为设计好特征，由网络实现提取", "C. 不需要提取特征", "D. 根据特征集合提取"],
                answer: "A",
                explanation: "深度学习通过网络自动提取特征。"
            },
            {
                id: 6,
                question: "下面对一个CNN网络各层卷积核可视化输出，____对应比较高的层次。",
                options: ["A. 不能确定", "B. N层", "C. P层", "D. M层"],
                answer: "C",
                explanation: "P层对应比较高的层次，提取更抽象的特征。",
                img: "image/p.png"
            },
            {
                id: 7,
                question: "CNN网络中池化层的作用有___。",
                options: ["A. 实现局部特征提取", "B. 减少过拟合", "C. 减少隐层节点数", "D. 压缩特征图"],
                answer: "D",
                explanation: "池化层的主要作用是压缩特征图（降维）。"
            },
            {
                id: 8,
                question: "假设我们需要训练一个卷积神经网络，来完成500种图像分类，类别采用独热编码。该卷积神经网络最后一层是分类层，则最后一层输出向量的维数大小可能是_____。",
                options: ["A. 100", "B. 500", "C. 1", "D. 250"],
                answer: "B",
                explanation: "输出层维数应与类别数一致，即500。"
            },
            {
                id: 9,
                question: "感受野是CNN的每层卷积特征图上的像素点在——中映射的区域大小。",
                options: ["A. 输出特征图", "B. 原始图像", "C. 卷积核", "D. 全连接层"],
                answer: "B",
                explanation: "感受野是特征图像素在原始图像中映射的区域大小。"
            },
            {
                id: 26,
                question: "CNN网络中池化层的作用有____。",
                options: ["A. 实现局部特征提取", "B. 减少过拟合", "C. 减少隐层节点数", "D. 压缩特征图"],
                answer: "C",
                explanation: "池化层可以减少隐层节点数，降低计算量。"
            },
            {
                id: 27,
                question: "卷积神经网络输入的彩色图像数据的张量格式为_____。",
                options: ["A. (样本数, 高度, 宽度)", "B. (高度, 宽度)", "C. (样本数, 高度, 宽度, 通道数)", "D. (高度*宽度)"],
                answer: "C",
                explanation: "彩色图像的张量格式为(样本数, 高度, 宽度, 通道数)，通道数为3表示RGB。"
            }
        ],
        multipleChoice: [
            {
                id: 10,
                question: "CNN网络中，卷积核大小一般常采用____。",
                options: ["A. 3*3", "B. 1024*1024", "C. 100*100", "D. 5*5"],
                answer: ["A", "D"],
                explanation: "常用卷积核大小为3×3和5×5。"
            },
            {
                id: 11,
                question: "类激活的热力图可以辅助观察____。",
                options: ["A. 分类对象的视觉模式", "B. 分类对象的位置", "C. 分类对象的激活强度分布", "D. 分类对象的大小"],
                answer: ["B", "C"],
                explanation: "热力图可以显示分类对象的位置和激活强度分布。"
            },
            {
                id: 12,
                question: "在训练深度神经网络的过程中，如果泛化能力太差，则可以____。",
                options: ["A. 调整优化器", "B. 调整网络结构", "C. 调整样本", "D. 调整学习率"],
                answer: ["A","B", "C"],
                explanation: "调整网络结构和样本可以改善泛化能力。"
            },
            {
                id: 13,
                question: "CNN网络中可能包含____层。",
                options: ["A. 卷积层", "B. 全连接层", "C. 池化层", "D. 输入层"],
                answer: ["A", "B", "C", "D"],
                explanation: "CNN可以包含卷积层、全连接层、池化层和输入层。"
            },
            {
                id: 14,
                question: "深度学习对____的数据集没有明显优势。",
                options: ["A. 数据集小", "B. 有局部相关性", "C. 数据集大", "D. 没有局部相关性"],
                answer: ["A", "D"],
                explanation: "深度学习对数据集小或没有局部相关性的数据集没有明显优势。"
            }
        ],
        judgment: [
            {
                id: 15,
                question: "类激活的热力图中热度最高的像素说明其对分类的贡献度越大。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。热度越高表示对分类的贡献越大。"
            },
            {
                id: 16,
                question: "增大卷积核的大小必然会提高卷积神经网络的性能。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。卷积核大小不是越大越好，需要根据具体任务选择。"
            },
            {
                id: 17,
                question: "卷积神经网络可以对一个输入完成旋转、错切等变换。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。CNN本身不能完成几何变换，需要通过数据增强等方式实现。"
            },
            {
                id: 18,
                question: "CNN网络的一个卷积核只能提取一种模式。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。一个卷积核学习一种特征模式。"
            },
            {
                id: 19,
                question: "卷积神经网络越高层次，输出的特征图越大。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。层次越高，特征图通常越小。"
            },
            {
                id: 20,
                question: "卷积神经网络卷积核的深度和下层输入数据通道数相同。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。卷积核的深度与上层输入数据的通道数相同。"
            },
            {
                id: 21,
                question: "卷积神经网络越高层次，输出的特征图稀疏度越大。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。高层次特征更加稀疏。"
            },
            {
                id: 22,
                question: "CNN网络的每个卷积层之后都有池化层。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。不是每个卷积层后都有池化层。"
            },
            {
                id: 23,
                question: "卷积神经网络的参数量要远远小于同样规模的全连接神经网络的参数量。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。CNN由于权值共享，参数量远小于全连接网络。"
            },
            {
                id: 24,
                question: "卷积神经网络越高层次，提取到的特征越具有通用性。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。低层次特征更具有通用性，高层次特征更具体。"
            },
            {
                id: 28,
                question: "CNN中，卷积核的各元素值是神经网络在训练过程中自己学习得到。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。这是一道额外题目，答案设为错。"
            }
        ]
    },
    "第四章": {
        singleChoice: [
            {
                id: 1,
                question: "预训练模型是指____。",
                options: ["A. 预先根据任务特点，对模型结构进行调整", "B. 已经在大数据集上训练好的一个模型", "C. 在正式训练之前，做一次试验训练", "D. 先训练一个模型作为基准"],
                answer: "B",
                explanation: "预训练模型是指已经在大数据集上训练好的一个模型。"
            },
            {
                id: 2,
                question: "微调预训练模型，一般是指调整____。",
                options: ["A. 底层卷积层", "B. 全连接层", "C. 高层卷积层", "D. 任意一个或几个卷积层"],
                answer: "C",
                explanation: "微调预训练模型一般是指调整高层卷积层。"
            },
            {
                id: 3,
                question: "使用预训练模型进行特征提取，要训练的部分是____。",
                options: ["A. 整个网络", "B. 底层卷积层", "C. 高层卷积层", "D. 全连接分类器"],
                answer: "D",
                explanation: "使用预训练模型进行特征提取时，要训练的是全连接分类器。"
            },
            {
                id: 4,
                question: "预训练模型是指____。",
                options: ["A. 在正式训练之前，做一次试验训练", "B. 先训练一个模型作为基准", "C. 已经在大数据集上训练好的一个模型", "D. 预先根据任务特点，对模型结构进行调整"],
                answer: "C",
                explanation: "预训练模型是指已经在大数据集上训练好的一个模型。"
            },
            {
                id: 5,
                question: "要解决的问题只有少量的数据，但幸运的是有一个之前训练过的针对类似问题的神经网络模型。最佳方案是____。",
                options: ["A. 冻结除第一层之外的所有层，微调第一层", "B. 冻结除最后一层之外的所有层，重新训练最后一层", "C. 对于新的数据集重新训练模型", "D. 评估模型每一层的功能，然后选择其中的某些层"],
                answer: "B",
                explanation: "最佳方案是冻结除最后一层之外的所有层，重新训练最后一层。"
            },
            {
                id: 6,
                question: "预训练模型的卷积基一般____。",
                options: ["A. 包含卷积层和池化层", "B. 包含冻结的卷积层", "C. 只包含卷积层", "D. 包含卷积层、池化层和全连接层"],
                answer: "A",
                explanation: "预训练模型的卷积基一般包含卷积层和池化层。"
            },
            {
                id: 7,
                question: "微调预训练模型，一般是指调整____。",
                options: ["A. 底层卷积层", "B. 全连接层", "C. 任意一个或几个卷积层", "D. 高层卷积层"],
                answer: "D",
                explanation: "微调预训练模型一般是指调整高层卷积层。"
            },
            {
                id: 8,
                question: "预训练模型的卷积基一般____。",
                options: ["A. 只包含卷积层", "B. 包含卷积层和池化层", "C. 包含冻结的卷积层", "D. 包含卷积层、池化层和全连接层"],
                answer: "B",
                explanation: "预训练模型的卷积基一般包含卷积层和池化层。"
            },
            {
                id: 9,
                question: "使用预训练模型进行特征提取，要训练的部分是____。",
                options: ["A. 高层卷积层", "B. 全连接分类器", "C. 底层卷积层", "D. 整个网络"],
                answer: "B",
                explanation: "使用预训练模型进行特征提取时，要训练的是全连接分类器。"
            },
            {
                id: 10,
                question: "数据增强可以有效提升模型质量，最好在____进行数据增强。",
                options: ["A. 整个数据集", "B. 验证集", "C. 训练集", "D. 测试集"],
                answer: "C",
                explanation: "数据增强最好在训练集上进行。"
            }
        ],
        multipleChoice: [
            {
                id: 11,
                question: "通过数据增强可以减少过拟合的发生，常用的方法有以下____。",
                options: ["A. 从数据源采集更多的数据", "B. 复制多份一样的数据放在一起", "C. 复制原有数据并添加随机噪声", "D. 根据现有样本估计样本的分布，然后按照此分布再产生一些样本"],
                answer: ["A", "C", "D"],
                explanation: "数据增强常用方法包括采集更多数据、添加噪声、按分布生成样本等。"
            },
            {
                id: 12,
                question: "对图片数据进行数据增强可以采用____方法。",
                options: ["A. 随机裁剪", "B. 增加噪声", "C. 数据集中两个图像叠加", "D. 旋转图像"],
                answer: ["A", "B", "D"],
                explanation: "图片数据增强可采用随机裁剪、增加噪声、旋转图像等方法。"
            },
            {
                id: 13,
                question: "微调预训练模型时，需要进行两次训练：____。",
                options: ["A. 分类器和解冻层训练", "B. 解冻层训练", "C. 整个网络训练", "D. 分类器训练"],
                answer: ["A", "D"],
                explanation: "微调需要进行分类器训练，以及分类器和解冻层训练。"
            },
            {
                id: 14,
                question: "在微调预训练模型时，____情况下，冻结层数越少。",
                options: ["A. 数据集越小", "B. 数据集与原始数据集相似性越大", "C. 数据集与原始数据集相似性越小", "D. 数据集越大"],
                answer: ["C", "D"],
                explanation: "数据集越大或与原始数据集相似性越小，冻结层数越少。"
            },
            {
                id: 15,
                question: "Keras的图片生成器的主要作用是____。",
                options: ["A. 随机动态生成图像", "B. 生成图像并保存到磁盘", "C. 实现数据的转换", "D. 自动批量加载磁盘图像"],
                answer: ["C", "D"],
                explanation: "Keras图片生成器主要用于实现数据转换和自动批量加载磁盘图像。"
            },
            {
                id: 16,
                question: "在微调预训练模型时，____情况下，冻结层数越少。",
                options: ["A. 数据集与原始数据集相似性越小", "B. 数据集与原始数据集相似性越大", "C. 数据集越大", "D. 数据集越小"],
                answer: ["A", "C"],
                explanation: "数据集越大或与原始数据集相似性越小，冻结层数越少。"
            }
        ],
        judgment: []
    },
    "第五章": {
        singleChoice: [
            {
                id: 1,
                question: "在经过学习获得的词嵌入空间中，语法和语义上相近的词汇____。",
                options: ["A. 距离相等", "B. 距离为0", "C. 距离更远", "D. 距离更近"],
                answer: "D",
                explanation: "语义相近的词汇在词嵌入空间中距离更近。"
            },
            {
                id: 2,
                question: "词袋模型是文本向量化的一种方法，它具有____。",
                options: ["A. 通常需要高维度的向量来表示单词", "B. 把单词压缩在一个低维度的袋子中", "C. 可以充分体现词语之间的语序关系", "D. 把单词嵌入在一个低纬度稠密空间"],
                answer: "A",
                explanation: "词袋模型通常需要高维度的向量来表示单词。"
            },
            {
                id: 3,
                question: "要了解消费者对某个产品的总体观点，可以采用____对用户评论进行分析得到。",
                options: ["A. 情感分析", "B. 自动摘要", "C. 内容标签", "D. 文本对话"],
                answer: "A",
                explanation: "情感分析可以了解消费者对产品的总体观点。"
            },
            {
                id: 4,
                question: "在使用深度学习进行文本处理时，一个文本句子要被理解，首先需要做的是____。",
                options: ["A. 生成词嵌入", "B. 词性标注", "C. 分词", "D. 命名实体识别"],
                answer: "C",
                explanation: "文本处理首先需要进行分词。"
            },
            {
                id: 5,
                question: "如果要采用神经网络来对文本进行建模，必须先将文本向量化，这一过程是指____。",
                options: ["A. 获得文本类别标签", "B. 将文本分词", "C. 将文本压缩", "D. 将文本转换为数值张量"],
                answer: "D",
                explanation: "文本向量化是将文本转换为数值张量的过程。"
            },
            {
                id: 6,
                question: "在学习词嵌入时，嵌入维度一般____。",
                options: ["A. 大于数据集总单词个数", "B. 小于数据集总单词个数", "C. 大于输入序列的长度", "D. 小于输入序列的长度"],
                answer: "B",
                explanation: "嵌入维度一般小于数据集总单词个数。"
            }
        ],
        multipleChoice: [
            {
                id: 7,
                question: "以下____神经网络适合处理序列数据。",
                options: ["A. 一维CNN", "B. 双向LSTM", "C. LSTM", "D. 二维CNN"],
                answer: ["A", "B", "C"],
                explanation: "一维CNN、双向LSTM和LSTM都适合处理序列数据。"
            },
            {
                id: 8,
                question: "TF-IDF(词频-逆文档频率)能反映出词在文档中的重要性，是因为____。",
                options: ["A. TF-IDF值与该词在整个语料库中出现的次数成正比", "B. TF-IDF值与该词在整个语料库中出现的次数成反比", "C. TF-IDF值与该词在某文档中出现的次数成正比", "D. TF-IDF值与该词在某文档中出现的次数成反比"],
                answer: ["B", "C"],
                explanation: "TF-IDF与词在语料库中出现次数成反比，与在文档中出现次数成正比。"
            },
            {
                id: 9,
                question: "以下属于____词袋模型。",
                options: ["A. Word2Vec", "B. 独热编码", "C. SOW", "D. TF-IDF"],
                answer: ["B", "C", "D"],
                explanation: "独热编码和TF-IDF属于词袋模型。"
            },
            {
                id: 10,
                question: "文本向量化的两种表示方法是____。",
                options: ["A. 归一化", "B. 独热编码", "C. 词嵌入", "D. Z-Score"],
                answer: ["B", "C"],
                explanation: "文本向量化的两种主要方法是独热编码和词嵌入。"
            },
            {
                id: 11,
                question: "以下____属于文本处理任务。",
                options: ["A. 自动摘要", "B. 机器翻译", "C. 自动写诗", "D. 自动绘画"],
                answer: ["A", "B", "C"],
                explanation: "自动摘要、机器翻译和自动写诗属于文本处理任务。"
            },
            {
                id: 12,
                question: "通过拍照翻译可以将外文菜单、路牌等信息转换为自己熟悉的语言文字，这主要通过____技术实现。",
                options: ["A. 统计分析", "B. 机器翻译", "C. 图像识别", "D. 语音识别"],
                answer: ["B", "C"],
                explanation: "拍照翻译通过图像识别和机器翻译技术实现。"
            },
            {
                id: 17,
                question: "深度全连接神经网络在图像处理中有_____弱点。",
                options: ["A. 无法利用相邻像素关联", "B. 参数量太大", "C. 模型结构单一", "D. 过拟合严重"],
                answer: ["A", "B"],
                explanation: "深度全连接神经网络无法利用相邻像素关联，且参数量太大。"
            },
            {
                id: 18,
                question: "以下____属于循环神经网络。",
                options: ["A. LSTM", "B. CNN", "C. GRU", "D. VGG"],
                answer: ["A", "C"],
                explanation: "LSTM和GRU是循环神经网络，CNN和VGG是卷积神经网络。"
            }
        ],
        judgment: [
            {
                id: 13,
                question: "百度搜索引擎不需要使用自然语言处理技术，只需要关键字匹配即可。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。搜索引擎需要使用自然语言处理技术来理解查询意图。"
            },
            {
                id: 14,
                question: "判断两个词汇是否具有相近的含义，可以计算两个词汇的词向量相似度获得。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。词向量相似度可以反映语义相似性。"
            },
            {
                id: 15,
                question: "双向循环神经网络对输入数据进行正向和方向两次处理，再合并结果。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。双向RNN从两个方向处理输入。"
            },
            {
                id: 16,
                question: "预训练词嵌入是使用大规模文本训练得到的词向量，使用它一般可以提高模型性能。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。预训练词嵌入可以提高模型性能。"
            }
        ]
    },
    "第六章": {
        singleChoice: [
            {
                id: 1,
                question: "语音识别中对数据预处理时分帧____。",
                options: ["A. 将语音切割为有交叠的不等长帧", "B. 将语音切割为无交叠的不等长帧", "C. 将语音切割为有交叠的等长帧", "D. 将语音切割为无交叠的等长帧"],
                answer: "C",
                explanation: "分帧是将语音切割为有交叠的等长帧。"
            },
            {
                id: 2,
                question: "传统语音识别方法中把____做为基本单元，它也是构成单词的基本单位。",
                options: ["A. 状态", "B. 帧", "C. 音素", "D. 字"],
                answer: "C",
                explanation: "传统语音识别方法以音素为基本单元。"
            },
            {
                id: 3,
                question: "语音识别中使用的语言模型一般是____。",
                options: ["A. 人工建立的", "B. 基于文本数据训练得到", "C. 与语种无关", "D. 与应用领域无关"],
                answer: "B",
                explanation: "语言模型一般基于文本数据训练得到。"
            },
            {
                id: 4,
                question: "在循环神经网络中，通过堆叠多个循环层可以提高模型的表达能力，在堆叠时——。",
                options: ["A. 各堆叠层的激活函数必须相同", "B. 只能堆叠单向的循环层，不能堆叠双向循环层", "C. 只能堆叠同类型的循环层，如必须都是LSTM", "D. 可以堆叠不同类型的循环层，如LSTM、GRU等"],
                answer: "D",
                explanation: "可以堆叠不同类型的循环层。"
            },
            {
                id: 5,
                question: "自动语音识别（Automatic Speech Recognition,ASR）的目标是从语音信号识别出____。",
                options: ["A. 话语的情感极性", "B. 话语中的含义", "C. 话语对应的文本", "D. 说话者的身份"],
                answer: "C",
                explanation: "ASR的目标是从语音信号识别出对应的文本。"
            },
            {
                id: 6,
                question: "声音是一种时序数据，是对连续声音信号的____进行采样获得。",
                options: ["A. 频率", "B. 周期", "C. 长度", "D. 振幅"],
                answer: "D",
                explanation: "声音是对振幅进行采样获得的时序数据。"
            },
            {
                id: 21,
                question: "在解决实际问题时，人工智能建模一般采用以下策略____。",
                options: ["A. 从简单且计算代价低的模型开始", "B. 从最新提出的模型开始", "C. 从应用最广泛的模型开始", "D. 从复杂度最高的模型开始"],
                answer: "A",
                explanation: "应该从简单且计算代价低的模型开始，逐步提高复杂度。"
            },
            {
                id: 22,
                question: "对于数值型时间序列数据的预测模型，应该采用____进行评估。",
                options: ["A. Recall", "B. MAE", "C. AUC", "D. ACC"],
                answer: "B",
                explanation: "数值型时间序列数据预测应使用MAE（平均绝对误差）进行评估。"
            }
        ],
        multipleChoice: [
            {
                id: 7,
                question: "循环神经网络____。",
                options: ["A. 适合处理序列数据", "B. 神经元带自反馈", "C. 只能处理固定长度的文本", "D. 能处理任意长度的文本"],
                answer: ["A", "B", "D"],
                explanation: "RNN适合处理序列数据，神经元带自反馈，能处理任意长度的文本。"
            },
            {
                id: 8,
                question: "时间序列数据一般包括____。",
                options: ["A. 属性值", "B. 周期值", "C. 时间戳", "D. 随机值"],
                answer: ["A", "C"],
                explanation: "时间序列数据包括属性值和时间戳。"
            },
            {
                id: 9,
                question: "可以利用RNN对时间序列数据建模，实现____功能。",
                options: ["A. 序列分类", "B. 回归预测", "C. 异常检测", "D. 计算周期"],
                answer: ["A", "B", "C"],
                explanation: "RNN可以实现序列分类、回归预测和异常检测功能。"
            },
            {
                id: 10,
                question: "时间序列数据一般具有____特性。",
                options: ["A. 周期性", "B. 趋势性", "C. 随机性", "D. 综合性"],
                answer: ["A", "B", "C", "D"],
                explanation: "时间序列数据具有周期性、趋势性、随机性和综合性。"
            },
            {
                id: 11,
                question: "时间序列数据可以有不同的观察尺度，以下____可能作为观察尺度。",
                options: ["A. 分钟", "B. 季度", "C. 月", "D. 天"],
                answer: ["A", "B", "C", "D"],
                explanation: "分钟、季度、月、天都可以作为观察尺度。"
            },
            {
                id: 12,
                question: "语音识别需要两个模型____合起来完成对语音的识别。",
                options: ["A. 信号模型", "B. 语义模型", "C. 声学模型", "D. 语言模型"],
                answer: ["C", "D"],
                explanation: "语音识别需要声学模型和语言模型。"
            }
        ],
        judgment: [
            {
                id: 13,
                question: "文本是一种序列数据。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。文本是典型的序列数据。"
            },
            {
                id: 14,
                question: "在语音识别应用设计时，待识别领域和训练文本的领域具有一致性，可以得到更好的识别效果。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。领域一致性可以提高识别效果。"
            },
            {
                id: 15,
                question: "在RNN网络中，recurrent_dropout是同一循环层内的失活比例。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。recurrent_dropout是循环层内的失活比例。"
            },
            {
                id: 16,
                question: "采用深度学习进行语音识别，可以直接实现speech-to-text。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。深度学习可以直接实现语音到文本的转换。"
            },
            {
                id: 17,
                question: "对于数据序列数据处理，如果整体顺序不重要，那么采用一维CNN建模更好，因为计算代价比RNN更小。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。当顺序不重要时，一维CNN计算代价更小。"
            },
            {
                id: 18,
                question: "处理非常长的序列数据时，可以在RNN之后使用一维CNN来减少计算代价。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。应该在一维CNN之后使用RNN，而不是RNN之后使用CNN。"
            },
            {
                id: 19,
                question: "LSTM和CNN适合处理序列数据，是因为它们采用带自反馈的神经元。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。CNN没有自反馈神经元，LSTM才有。"
            },
            {
                id: 20,
                question: "时间序列数据通常是连续产生的，数值会比较接近，因此不需要对数据进行标准化。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。时间序列数据也需要进行标准化。"
            }
        ]
    },
    "第七章": {
        singleChoice: [
            {
                id: 1,
                question: "____可以帮助神经网络模型对输入的每个部分赋予不同的权重，自动学习并选择性地关注更加关键重要的信息，提高模型的性能和泛化能力。",
                options: ["A. DropOut", "B. 网络层堆叠", "C. 规范化", "D. 注意力机制"],
                answer: "D",
                explanation: "注意力机制可以帮助模型关注关键信息。"
            },
            {
                id: 2,
                question: "GPT中的T是指____。",
                options: ["A. Transformers", "B. LSTM", "C. Text", "D. aTtention"],
                answer: "A",
                explanation: "GPT中的T指Transformers。"
            },
            {
                id: 3,
                question: "Keras使用____类来支持函数式泛型模型的实现。",
                options: ["A. model", "B. Sequential", "C. Functional", "D. Model"],
                answer: "D",
                explanation: "Keras使用Model类来支持函数式API。"
            },
            {
                id: 4,
                question: "Encoder-Decoder中，Encoder将输入序列编码得到____传递给Decoder。",
                options: ["A. 独热编码", "B. 词嵌入", "C. 语义向量", "D. 查询向量"],
                answer: "C",
                explanation: "Encoder将输入序列编码为语义向量传递给Decoder。"
            },
            {
                id: 5,
                question: "使用深度神经网络进行文本生成的最后一层任务是____。",
                options: ["A. 单词语义的分析", "B. 字符聚类为单词", "C. 字符或单词的回归预测", "D. 字符或单词的分类"],
                answer: "D",
                explanation: "文本生成的最后一层是字符或单词的分类任务。"
            },
            {
                id: 6,
                question: "CLIP预训练网络主要用于____。",
                options: ["A. 生成文本", "B. 匹配图像和文本文本", "C. 编辑图像", "D. 生成图像"],
                answer: "B",
                explanation: "CLIP用于匹配图像和文本。"
            },
            {
                id: 7,
                question: "多输入模型可以使用相加或连接等操作将不同的输入分支在______聚合。",
                options: ["A. Dense层", "B. Pooling层", "C. CNN层", "D. Merge层"],
                answer: "D",
                explanation: "多输入模型在Merge层聚合。"
            },
            {
                id: 8,
                question: "多输出模型包含多个任务，损失函数的定义方式______。",
                options: ["A. 各个头单独定义损失函数，各自独立训练", "B. 只要有一个头定义损失函数即可", "C. 各个头应该使用相同的损失函数", "D. 各个头单独定义损失函数，合并在一起训练"],
                answer: "D",
                explanation: "各个头单独定义损失函数，合并在一起训练。"
            },
            {
                id: 9,
                question: "Inception模块采用有向无环图结构，它的主要结构特点______。",
                options: ["A. 一个输入被多个不同分支并行处理", "B. 共享权重", "C. 将上游数据重新注入下游", "D. 顺序堆叠"],
                answer: "A",
                explanation: "Inception模块的特点是一个输入被多个不同分支并行处理。"
            }
        ],
        multipleChoice: [
            {
                id: 10,
                question: "序贯模型是一种顺序式模型，这种网络结构_____。",
                options: ["A. 可以支持共享层", "B. 网络层按顺序线性堆叠", "C. 单输入单输出", "D. 层之间可以跨层连接"],
                answer: ["B", "C"],
                explanation: "序贯模型的网络层按顺序线性堆叠，是单输入单输出。"
            },
            {
                id: 11,
                question: "多输入模型的融合层，可以使用的融合计算有______。",
                options: ["A. Dot()", "B. Multiply()", "C. Add()", "D. Concatenate()"],
                answer: ["A", "B", "C", "D"],
                explanation: "可以使用Multiply()、Add()、Concatenate()等融合计算。"
            },
            {
                id: 12,
                question: "GAN是一种生成式对抗网络，它采用____网络能迫使生成图像与真实图像在统计上几乎无法区分，从而生成相当逼真的图像。",
                options: ["A. 优化器", "B. 生成器", "C. 合成器", "D. 判别器"],
                answer: ["B", "D"],
                explanation: "GAN采用生成器和判别器两种网络。"
            },
            {
                id: 13,
                question: "深度学习进行文本生成时，____。",
                options: ["A. 语句不能太长，太长会离谱", "B. 生成结果和训练集风格相似", "C. 模型学习得到的具有统计结构的潜在空间", "D. 语言模型可能根据语法规则建立"],
                answer: ["B", "C"],
                explanation: "生成结果和训练集风格相似，模型学习的是具有统计结构的潜在空间。"
            },
            {
                id: 14,
                question: "多模态生成是指模型能同时处理多种类型的____。",
                options: ["A. 输入", "B. 输出", "C. 参数", "D. 偏好"],
                answer: ["A", "B"],
                explanation: "多模态生成是指模型能同时处理多种类型的输入和输出。"
            },
            {
                id: 15,
                question: "AIGC是指用AI技术生成内容，可生成的内容可以是____。",
                options: ["A. 文本", "B. 图像", "C. 视频", "D. 音频"],
                answer: ["A", "B", "C", "D"],
                explanation: "AIGC可以生成文本、图像、视频和音频等多种内容。"
            },
            {
                id: 23,
                question: "采用神经风格迁移创作图画是将____组合在一起，产生特殊效果。",
                options: ["A. 风格图像", "B. 内容图像", "C. 随机图像", "D. 背景图像"],
                answer: ["A", "B"],
                explanation: "神经风格迁移将风格图像和内容图像组合在一起。"
            }
        ],
        judgment: [
            {
                id: 16,
                question: "Seq2Seq模型的给定序列和输出序列一般长度相同。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。Seq2Seq的输入和输出序列长度可以不同。"
            },
            {
                id: 17,
                question: "多输入模型的不同输入的数据类型应该相同。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。多输入模型可以接受不同数据类型的输入。"
            },
            {
                id: 18,
                question: "深度学习在文本生成、乐曲创作和绘画等领域都有出色的表现，说明该类模型可以产生人类情感和心智。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。模型只是模拟输出，不具备真正的情感和心智。"
            },
            {
                id: 19,
                question: "多输出模型可以支持多个任务实现，这些任务的类型可以不同。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。多输出模型可以支持不同类型的任务。"
            },
            {
                id: 20,
                question: "对抗样本是指能提高深度学习模型学习能力的样本。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。对抗样本是指能欺骗模型的样本，而不是提高学习能力。"
            },
            {
                id: 24,
                question: "Diffusion扩散模型的训练数据获取方法：向原始图像持续添加噪声，得到各步带噪声图像。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。Diffusion模型通过向原始图像持续添加噪声来生成训练数据。"
            }
        ]
    },
    "第八章": {
        singleChoice: [
            {
                id: 1,
                question: "在智能体（Agent）的构建体系中，ReAct框架中Act阶段的主要作用是______。",
                options: ["A. 生成任务推理步骤", "B. 调用外部工具或API", "C. 评估任务完成质量", "D. 压缩模型参数量"],
                answer: "B",
                explanation: "ReAct框架中Act阶段的主要作用是调用外部工具或API。"
            },
            {
                id: 2,
                question: "在RAG模型中，通常是使用______来选择检索文档的。",
                options: ["A. 随机序号", "B. 词频", "C. 相似度计算", "D. 人工标注"],
                answer: "C",
                explanation: "RAG使用相似度计算来选择检索文档。"
            },
            {
                id: 3,
                question: "RAG模型通常结合了以下______两种技术实现的。",
                options: ["A. 分类和回归", "B. 检索和生成", "C. 识别和推荐", "D. 预测和分析"],
                answer: "B",
                explanation: "RAG结合了检索和生成两种技术。"
            },
            {
                id: 4,
                question: "微调后，模型的性能提升主要体现在以下哪个方面______。",
                options: ["A. 生成更长的文本", "B. 提高特定任务的准确性", "C. 减少计算资源使用", "D. 增加模型的鲁棒性"],
                answer: "B",
                explanation: "微调主要提高特定任务的准确性。"
            },
            {
                id: 5,
                question: "在Few-shot学习与微调的关系中，下列说法中______是正确的。",
                options: ["A. Few-shot需要更新模型参数，微调不需要", "B. 微调需要更新参数，Few-shot直接推理", "C. 两者都需要大量标注数据", "D. 微调依赖提示工程（Prompt Engineering）"],
                answer: "B",
                explanation: "微调需要更新参数，Few-shot直接推理。"
            },
            {
                id: 6,
                question: "在以下技术中，___________可以同时用于大模型微调和RAG优化。",
                options: ["A. 向量数据库（Vector Database）", "B. 参数高效微调（如Adapter）", "C. 提示（Prompt）", "D. 强化学习人类反馈（RLHF）"],
                answer: "C",
                explanation: "提示。"
            }
        ],
        multipleChoice: [
            {
                id: 7,
                question: "多模态生成是指模型能同时处理多种类型的____。",
                options: ["A. 输入", "B. 输出", "C. 参数", "D. 偏好"],
                answer: ["A", "B"],
                explanation: "多模态生成是指模型能同时处理多种类型的输入和输出。"
            },
            {
                id: 8,
                question: "在以下微调方法中，______方法属于参数高效微调（Parameter-Efficient Fine-tuning）。",
                options: ["A. LoRA（Low-Rank Adaptation）", "B. 全参数微调（Full Fine-tuning）", "C. 提问微调（Prompt-tuning）", "D. 前缀微调（Prefix-tuning）"],
                answer: ["A", "C", "D"],
                explanation: "LoRA、Prompt-tuning和Prefix-tuning属于参数高效微调方法。"
            },
            {
                id: 9,
                question: "在微调过程中，冻结（Freeze）部分网络层的主要目的是_____。",
                options: ["A. 降低模型推理速度", "B. 减少计算资源消耗", "C. 保留原模型原来的能力", "D. 增加模型参数"],
                answer: ["B", "C"],
                explanation: "冻结层可以减少计算资源消耗，保留原模型的能力。"
            },
            {
                id: 10,
                question: "相比纯生成式大模型，RAG更适合_______任务。",
                options: ["A. 开放域创意写作", "B. 基于企业知识库的客服问答", "C. 多语言翻译", "D. 实时股票数据分析"],
                answer: ["B", "D"],
                explanation: "RAG更适合基于知识库的问答和实时数据分析任务。"
            },
            {
                id: 11,
                question: "一般而言，RAG工作流程通常包含______阶段。",
                options: ["A. 检索（Retrieval）", "B. 强化学习训练（RL Training）", "C. 生成（Generation）", "D. 知识蒸馏（Knowledge Distillation）"],
                answer: ["A", "C"],
                explanation: "RAG工作流程包含检索和生成两个阶段。"
            }
        ],
        judgment: [
            {
                id: 12,
                question: "LLM智能体（Agent）的记忆机制仅依赖模型参数，无法保存长期对话历史。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。Agent可以通过外部存储保存长期对话历史。"
            },
            {
                id: 13,
                question: "ReAct（Reasoning + Acting）框架允许智能体通过推理和行动迭代完成任务。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。ReAct框架结合推理和行动来完成任务。"
            },
            {
                id: 14,
                question: "LLM智能体（Agent）可以直接访问实时数据（如最新新闻），无需依赖外部工具。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。Agent需要依赖外部工具来访问实时数据。"
            },
            {
                id: 15,
                question: "微调后的模型推理速度一定比原始预训练模型更快。",
                options: ["A. 对", "B. 错"],
                answer: "B",
                explanation: "错误。微调不一定会提高推理速度。"
            },
            {
                id: 16,
                question: "RAG的核心思想是通过检索外部知识库来增强生成结果的准确性和相关性。",
                options: ["A. 对", "B. 错"],
                answer: "A",
                explanation: "正确。RAG通过检索外部知识来增强生成质量。"
            }
        ]
    }
};
