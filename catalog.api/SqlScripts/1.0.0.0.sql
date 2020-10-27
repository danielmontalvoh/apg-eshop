USE [AcmeCorporation]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Products](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](250) NOT NULL,
	[Brand] [varchar](100) NOT NULL,
	[Model] [varchar](250) NOT NULL,
	[UnitPrice] [money] NOT NULL,
	[DiscountPercentage] [int] NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CreatedBy] [varchar](50) NOT NULL,
	[ModifiedAt] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'ProductId'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'El identificador unívoco del producto en el sistema.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'ProductId'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'Description'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'La descripción del producto.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'Description'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'Brand'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'La marca del producto.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'Brand'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'Model'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'El modelo del producto.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'Model'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'UnitPrice'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'El valor o precio unitario del producto.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'UnitPrice'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'DiscountPercentage'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'El porcentaje de descuento del producto, expresado de 0 a 100.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'DiscountPercentage'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'Status'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'El estado del producto.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'Status'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'CreatedAt'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'La fecha y hora en que se creó el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'CreatedAt'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'CreatedBy'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'El identificador del usuario que creó el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'CreatedBy'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'ModifiedAt'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'La fecha y hora en que se modificó por última vez el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'ModifiedAt'
GO
IF NOT EXISTS (SELECT * FROM sys.fn_listextendedproperty(N'MS_Description' , N'SCHEMA',N'dbo', N'TABLE',N'Products', N'COLUMN',N'ModifiedBy'))
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'El nombre del último usuario que modificó por última vez el registro.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Products', @level2type=N'COLUMN',@level2name=N'ModifiedBy'
GO
